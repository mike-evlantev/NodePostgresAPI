const { Pool } = require("pg");
require("dotenv").config();

const connectDb = () => {
  try {
    const db = new Pool({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: process.env.PG_PORT
    });
    console.log("PostgreSQL Connected");
    return db;
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
