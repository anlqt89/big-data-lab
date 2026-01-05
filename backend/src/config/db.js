import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';

// On Mac Homebrew, the user is usually your macOS username
// You can find it by typing 'whoami' in your terminal
export const pool = new Pool({
  user: process.env.DB_USER, 
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD, // Homebrew installs usually don't have a default password
  port: process.env.DB_PORT,
});

export const  query = (text, params) => pool.query(text, params);