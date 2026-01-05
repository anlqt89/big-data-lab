import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import titleRoutes from './src/routes/titles.routes.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const corsOptions = {
  // Replace this with your actual generated Frontend domain from Railway
  origin: 'https://moviesbigdatalab.up.railway.app/', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allows cookies or authorization headers if needed
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(express.json());

// 1. API Routes
app.use("/api/titles", titleRoutes);

// 2. Serve Static Files (The React Build)
// This assumes your React build is in a folder named 'dist' inside 'frontend'
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// 3. Fallback Route
// This is critical for React Router (Single Page Apps) to work on refresh
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Railway will provide the PORT via environment variables
const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});