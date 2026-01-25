import express from "express"
import { titlesSearch } from "../controllers/titlesSearchController.js";
import { getSearchOptions } from "../controllers/utilitiesController.js";
const titleRoute = express.Router() //router

titleRoute.get("/search", titlesSearch); //Route: GET /api/titles/search
titleRoute.get("/", titlesSearch); //Route: GEt /api/titles/
titleRoute.get("/getSearchOptions", getSearchOptions) //Route: /api/titles/getSearchOptions
export default titleRoute;