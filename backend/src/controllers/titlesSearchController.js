import { SEARCH_STRATEGIES } from "../strategies/searchStrategies.js";
import { cleanValue, cleanRequestKeys } from "../utilities/stringUltils.js";
import { buildQuery } from "../utilities/dbUltils.js";
import { pool } from "../config/db.js";


/**
 * @param {Object} req.query
 * @param {string} req.query.mode - The search strategy: 'sequential', 'gin', 'gin_mat', or 'btree'
 * @param {string} [req.query.title] - Partial or full title of the work (primarytitle)
 * @param {string} [req.query.type] - The titletype (e.g., 'movie', 'tvSeries') - use your TITLE_TYPES constants
 * @param {string} [req.query.genres] - Comma-separated or single genre (e.g., 'Action,Comedy')
 * @param {number} [req.query.fromYear] - Minimum start year (e.g., 1990)
 * @param {number} [req.query.toYear] - Maximum start year (e.g., 2024)
 * @param {string} [req.query.tconst] - Unique ID for prefix search (e.g., 'tt001')
 * @param {string} [req.query.lastId] - The last tconst from the previous page for keyset pagination
 * @param {number} [req.query.limit] - Number of results to return (default: 20)
 */

export const titlesSearch = async (req, res) => {
    const { mode, ...filters } = req.query;

    const cleanMode = mode ? cleanValue(mode) : SEARCH_STRATEGIES.sequential.id;
    const cleanFilters = cleanRequestKeys(filters);
    const strategy = SEARCH_STRATEGIES[cleanMode] || SEARCH_STRATEGIES.sequential;

    const client = await pool.connect();

    try {
        
        if (cleanMode === 'sequential') {
            await client.query("SET enable_indexscan = off;");
            await client.query("SET enable_bitmapscan = off;");
        } else {
            await client.query("SET enable_indexscan = on;");
            await client.query("SET enable_bitmapscan = on;");
        }

        const plan = strategy.getPlan(cleanFilters);
        const { sql, values } = buildQuery(plan.baseSql, plan.filterDefs, plan.limit);

        const startTime = performance.now();
        const result = await client.query(sql, values); 
        const endTime = performance.now();
        
        res.json({
            executionTime: `${(endTime - startTime).toFixed(2)}ms`,
            plan: plan,
            strategyUsed: strategy.label,
            count: result.rowCount,
            hasNext: result.count >= Number(plan.limit),
            nextCursor: result.rowCount > 0 ? result.rows[result.rowCount - 1].tconst : null,
            results: result.rows,
        });

    } catch (err) {
        console.error("Search Error:", err);
        res.status(500).json({ error: err.message });
    } finally {
        // 5. Always reset flags and release the client to the pool
        await client.query("SET enable_indexscan = on;");
        await client.query("SET enable_bitmapscan = on;");
        client.release();
    }
};