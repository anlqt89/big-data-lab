import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';

const nodeMode = process.env.NODE_ENV;
// Local Environment
let dbConfig = {
  user: process.env.DB_LOCAL_USER, 
  host: process.env.DB_LOCAL_HOST,
  database: process.env.DB_LOCAL_NAME,
  password: process.env.DB_LOCAL_PASSWORD,
  port: process.env.DB_LOCAL_PORT,
};

//Production
if (nodeMode === 'production'){
  dbConfig =  {
  user: process.env.DB_USER, 
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  }
} else if (nodeMode === 'test'){
  dbConfig =  {
  user: process.env.DB_TEST_USER, 
  host: process.env.DB_TEST_HOST,
  database: process.env.DB_TEST_NAME,
  password: process.env.DB_TEST_PASSWORD,
  port: process.env.DB_TEST_PORT,
  }
}

console.log("---dbConfig---")
console.log(dbConfig)
// 2. Create the pool using that config
export const pool = new Pool({
  ...dbConfig,
  connectionTimeoutMillis: 5000,
});

export const query = (text, params) => pool.query(text, params);