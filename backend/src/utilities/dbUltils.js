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
        console.log(whereClause);
    return {
        sql: `${baseSql} ${whereClause} ORDER BY tconst ASC LIMIT ${limit}`,
        values
    };
}

export function buildQueryWithSort(baseSql, filterDefinitions, limit, configSort) {
    const conditions = [];
    const values = [];
    const sortConfig = JSON.parse(configSort); //convert string to Json
    const sortQuery = Object.keys(sortConfig) //Map key associate with table allies and sort keys
            .map(key => {
                const column = (key === 'startyear') ? 't.startyear' : `t.${key}`; //Map with table allie
                const direction = sortConfig[key] ? 'ASC' : 'DESC'; //sort key
                return `${column} ${direction}`;
            })
            .join(', '); // join sort by

    filterDefinitions.forEach(def => {
        if (def.value !== undefined && def.value !== null && def.value !== '') {
            values.push(def.transform ? def.transform(def.value) : def.value);
            conditions.push(`${def.column} ${def.operator} $${values.length}`);
        }
    });

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    return {
        sql: `${baseSql} ${whereClause} ORDER BY ${sortQuery} LIMIT ${limit}`,
        values
    };
}