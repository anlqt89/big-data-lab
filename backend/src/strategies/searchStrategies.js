import {TITLES_SEARCH_MODES } from "../constants/TitlesSearchModsType.js";

export const SEARCH_STRATEGIES = {
    sequential: {
        id: TITLES_SEARCH_MODES.SEQUENTIAL,
        label: "Sequential Scan",
        getPlan: (filters) => {
            return {
                baseSql: `SELECT * FROM titles t`,
                filterDefs: [
                    { column: 't.tconst', operator: '>', value: filters.lastId || 'tt0000000' },
                    { column: 't.genres', operator: 'ILIKE', value: filters.genres, transform: v => `${v}%` },
                    { column: 't.primarytitle', operator: 'ILIKE', value: filters.title, transform: v => `%${v}%` },
                    { column: 't.titletype', operator: 'ILIKE', value: filters.title, transform: v => `${v}` },
                    { column: 't.startyear', operator: '>=', value: filters.fromYear },
                    { column: 't.startyear', operator: '<=', value: filters.toYear },
                ],
                limit: filters.limit || 10
            };
        }
    },
    gin: {
        id: TITLES_SEARCH_MODES.GIN,
        label: "GIN Trigram Search",
        getPlan: (filters) => {
            return {
                baseSql: `SELECT * FROM titles t`,
                filterDefs: [
                    { column: 't.tconst', operator: '>', value: filters.lastId || 'tt0000000' },
                    { column: 't.genres', operator: 'ILIKE', value: filters.genres, transform: v => `${v}%` },
                    { column: 't.primarytitle', operator: 'ILIKE', value: filters.title, transform: v => `%${v}%` },
                    { column: 't.titletype', operator: 'ILIKE', value: filters.title, transform: v => `${v}` },
                    { column: 't.startyear', operator: '>=', value: filters.fromYear },
                    { column: 't.startyear', operator: '<=', value: filters.toYear },
                ],
                limit: filters.limit || 10
            };
        }
    },

    ginMaterialized: {
        id: TITLES_SEARCH_MODES.GIN_MAT,
        label: "GIN Materialized View",
        getPlan: (filters) => {
            return {
                baseSql: `SELECT * FROM search_registry t`,
                filterDefs: [
                    { column: 't.tconst', operator: '>', value: filters.lastId || 'tt0000000' },
                    { column: 't.search_text', operator: 'ILIKE', value: filters.title, transform: v => `%${v}` },
                    { column: 't.startyear', operator: '>=', value: filters.fromYear },
                    { column: 't.startyear', operator: '<=', value: filters.toYear },
                ],
                limit: filters.limit || 10
            };
        },
    },
};