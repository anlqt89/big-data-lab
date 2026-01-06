// backend/index.js

import "dotenv/config";
import express from "express";
import cors from "cors";
import titleRoutes from "./src/routes/titles.routes.js";

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

// Parse JSON bodies
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});


app.use("/api/titles", titleRoutes);


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
