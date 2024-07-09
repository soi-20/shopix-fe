// lib/db.js
import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Instagram",
  password: "postgres$1008",
  port: 5432,
});

export default pool;
