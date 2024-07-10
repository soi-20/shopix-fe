// lib/db.js
import { Pool } from "pg";
import process from "process";

const pool = new Pool({
  user: "soi",
  host: "shoppin-db.postgres.database.azure.com",
  database: "InstaPosts",
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
  ssl: true,
});

export default pool;
