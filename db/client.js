require("dotenv").config();
const { Pool } = require("pg");
const { DB_SECRET } = process.env;

const client = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : undefined,
      }
    : {
        user: "postgres",
        password: DB_SECRET,
        database: "grace-shopper",
      }
);

module.exports = client;
