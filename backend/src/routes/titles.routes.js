import express from "express"
import {
    listTitles
    // getTitleById,
    // getTitlesByYear
} from '../controllers/titles.controller.js'

const router = express.Router()

router.get("/search", listTitles); // GET /api/titles/search?key=...
router.get("/", listTitles)     // GET /api/titles?key=&limit=50...

export default router;