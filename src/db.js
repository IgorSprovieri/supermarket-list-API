require("dotenv").config();
import { Pool } from "pg";

export const db = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: Number(process.env.port),
});
