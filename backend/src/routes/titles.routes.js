import express from "express"
import {
    listTitles
    // getTitleById,
    // getTitlesByYear
} from '../controllers/titles.controller.js'

const router = express.Router()

router.get("/search", listTitles); // GET /api/titles/search?key=...
router.get("/", listTitles)     // GET /api/titles?key=&limit=50...
// router.get("/year/:year", getTitlesByYear) // GET /api/titles/year/2010
// router.get("/:tconst", getTitleById) // GET /api/titles/tt0000001

export default router;