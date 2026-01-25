import { TITLE_GENRES } from "../constants/genresType.js";
import {TITLES_SEARCH_MODES } from "../constants/TitlesSearchModsType.js";
import { TITLE_TYPES } from "../constants/titlesType.js";

export const getSearchOptions = (req, res) => {
    res.json({
        exampleUrl: `api/titles/search?
                        mode=gin
                        &titles=sheldo
                        n&cursor=
                        &limit=10
                        &genres=Comedy
                        &titletype=tvSeries
                        &fromYear=1977
                        &toYear=2000`,
        mode: {
            type: "string",
            pattern: TITLES_SEARCH_MODES
        },
        filters: {
            title: "string (Partial title search)",
            titletype: {
                type: "string",
                pattern: TITLE_TYPES
            } ,
            genres: {
                type: "string",
                pattern: TITLE_GENRES
            },
            fromYear: "number (YYYY)",
            toYear: "number (YYYY)",
            limit: "number (default 10)"
        },
       
    });
};