import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import titleRoutes from './src/routes/titles.routes.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());

// 1. API Routes
app.use("/api/titles", titleRoutes);

// 2. Serve Static Files (The React Build)
// This assumes your React build is in a folder named 'dist' inside 'frontend'
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// 3. Fallback Route
// This is critical for React Router (Single Page Apps) to work on refresh
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

// Railway will provide the PORT via environment variables
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});