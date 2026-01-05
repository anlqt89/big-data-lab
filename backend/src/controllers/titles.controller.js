import {pool, query} from "../config/db.js"
// http://localhost:5001/api/titles/search?key=women&limit=10&tconst=tt0001079&useindex=false&type=%22materialized%22
export async function listTitles(req, res) {
  console.log(`${new Date().toISOString()} - ${req.method} request to ${req.url}`);
  
  const client = await pool.connect();
  const startTime = performance.now();

  try {
    const key = (req.query.key ?? "").toString().trim();
    const pattern = key === "" ? "%" : `%${key}%`; //pattern $1 param
    const tconst = (req.query.tconst?? "tt0000000").toString();  //Tconst $2 param
    const limit = Math.min(parseInt(req.query.limit ?? "50", 10) || 50, 200);//Limit $3 param
    const rawType = (req.query.type ?? "standard").toString().trim();
    const type = rawType === "standard"? "standard" : "materialized";
    const tablenName = type === "standard"? "titles" : "search_registry";
    const targetColumn = type === "standard" ? "primarytitle" : "search_text";
    const useIndex = (req.query.useIndex ?? "false").toString();

    console.log("Table Name: ", tablenName)
    console.log("Column: ", targetColumn)
    let sql = `
        SELECT tconst, primarytitle, startyear, titletype, genres
        FROM ${tablenName}
        WHERE ${targetColumn} ILIKE $1
        AND tconst > $2
        ORDER BY tconst ASC
        LIMIT $3
      `;
    
    let params = [pattern, tconst, limit];
    await client.query("BEGIN");

    if (!useIndex) {
      await client.query("SET LOCAL enable_indexscan = OFF");
      await client.query("SET LOCAL enable_bitmapscan = OFF");
      await client.query("SET LOCAL enable_indexonlyscan = OFF");
    }

    const result = await client.query(sql, params);
    
    console.log("=== QUERY DEBUG ===");


    await client.query("COMMIT");
    const duration = (performance.now() - startTime).toFixed(2);

    const rows = result.rows;
    const nextCursor =
      rows.length > 0
        ? {
            cursorTitle: rows[rows.length - 1].primarytitle,
            cursorTconst: rows[rows.length - 1].tconst,
          }
        : null;
  return res.json({
        key,
        limit,
        tconst,
        type,           // 'normalized' or 'denormalized'
        useIndex,
        latencyMs: duration, // Precision measurement in ms
        data: rows,
        nextCursor,
        hasNext: rows.length === limit,
      });

  } catch (err) {
    await client.query("ROLLBACK").catch(() => {});
    console.error("listTitles error:", err);
    return res.status(500).json({ error: "Server error", detail: err.message });
  } finally {
    client.release();
  }
}