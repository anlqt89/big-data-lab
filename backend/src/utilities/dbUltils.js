export function buildQuery(baseSql, filterDefinitions, limit) {
    const conditions = [];
    const values = [];

    filterDefinitions.forEach(def => {
        if (def.value !== undefined && def.value !== null && def.value !== '') {
            values.push(def.transform ? def.transform(def.value) : def.value);
            conditions.push(`${def.column} ${def.operator} $${values.length}`);
        }
    });

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    return {
        sql: `${baseSql} ${whereClause} ORDER BY tconst ASC LIMIT ${limit}`,
        values
    };
}