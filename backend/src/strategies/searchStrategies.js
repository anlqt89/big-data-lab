import {TITLES_SEARCH_MODES } from "../constants/TitlesSearchModsType.js";

const getGenresArray = (genres) =>{
    if(!genres) return [];
    return genres.split(',').map(genre => genre.trim()).filter(Boolean)
}

const constructGenresConditions =(genres) =>{
    const genslist = getGenresArray(genres);
    return genslist.map(gen =>(
        { column: 't.genres', operator: 'ILIKE', value: gen, transform: v => `%${v}%` ,  wildCards: `'%${gen}%'`}
    ));
}
export const SEARCH_STRATEGIES = {
    
    sequential: {
        id: TITLES_SEARCH_MODES.SEQUENTIAL,
        label: "Sequential Scan",
        getPlan: (filters) => {

            const genresConditions = constructGenresConditions(filters.genres);
            return {
                baseSql: `SELECT * FROM titles t`,
                filterDefs: [
                    { column: 't.tconst', operator: '>', value: filters.cursor || 'tt0000000' , wildCards: filters.cursor || `'tt0000000'`},
                    ...genresConditions,
                    { column: 't.primarytitle', operator: 'ILIKE', value: filters.title, transform: v => `%${v}%`, wildCards: `'%${filters.title}%'`},
                    { column: 't.titletype', operator: 'LIKE', value: filters.titletype, transform: v => `${v}`,  wildCards: `'${filters.titletype}'`},
                    { column: 't.startyear', operator: '>=', value: filters.fromYear, wildCards: `${filters.fromYear}`},
                    { column: 't.startyear', operator: '<=', value: filters.toYear,  wildCards: `${filters.toYear}`},
                ],
                limit: filters.limit || 10
            };
        }
    },
    gin: {
        id: TITLES_SEARCH_MODES.GIN,
        label: "GIN Trigram Search",
        getPlan: (filters) => {
            const genresConditions = constructGenresConditions(filters.genres);
            return {
                baseSql: `SELECT * FROM titles t`,
                filterDefs: [
                    { column: 't.tconst', operator: '>', value: filters.cursor || 'tt0000000' , wildCards: filters.cursor || `'tt0000000'`},
                    ...genresConditions,
                    { column: 't.primarytitle', operator: 'ILIKE', value: filters.title, transform: v => `%${v}%`, wildCards: `'%${filters.title}%'`},
                    { column: 't.titletype', operator: 'LIKE', value: filters.titletype, transform: v => `${v}`,  wildCards: `'${filters.titletype}'`},
                    { column: 't.startyear', operator: '>=', value: filters.fromYear, wildCards: `${filters.fromYear}`},
                    { column: 't.startyear', operator: '<=', value: filters.toYear,  wildCards: `${filters.toYear}`},
                ],
                limit: filters.limit || 10
            };
        }
    },

    gin_mat: {
        id: TITLES_SEARCH_MODES.GIN_MAT,
        label: "GIN Materialized View",
        getPlan: (filters) => {
            const genresConditions = constructGenresConditions(filters.genres);
            return {
                baseSql: `SELECT * FROM search_registry t`,
                filterDefs: [
                    { column: 't.tconst', operator: '>', value: filters.cursor || 'tt0000000', wildCards: `'${filters.cursor || 'tt0000000'}'` },
                    { column: 't.search_text', operator: 'ILIKE', value: filters.title, transform: v => `%${v}%`, wildCards: `'%${filters.title}%'`},
                    ...genresConditions,
                       { column: 't.titletype', operator: 'LIKE', value: filters.titletype, transform: v => `${v}`,  wildCards: `'${filters.titletype}'`},
                     { column: 't.startyear', operator: '>=', value: filters.fromYear, wildCards: `${filters.fromYear}`},
                    { column: 't.startyear', operator: '<=', value: filters.toYear,  wildCards: `${filters.toYear}`},
                ],
                limit: filters.limit || 10,
                
            };
            
        },
    },
};