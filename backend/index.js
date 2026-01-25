// backend/index.js

import "dotenv/config";
import express from "express";
import cors from "cors";
import titleRoute from "./src/routes/titlesRoute.js";
const app = express();

const PORT = Number(process.env.PORT || 3000);
const CORS_ORIGIN = process.env.CORS_ORIGIN;

app.use(
  cors({
    origin: CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

//Help APIs
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});


//#titles Apis
app.use("/api/titles/", titleRoute);


app.use("/api", (req, res) => {
  res.status(404).json({ error: "Not Found" });
});


app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
