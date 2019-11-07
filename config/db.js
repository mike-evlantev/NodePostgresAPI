const { Pool, Client } = require("pg");
const parse = require("pg-connection-string").parse;
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

// const connectDb = () => {
//   try {
//     const connString = parse(
//       `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`
//     );
//     console.log(connString);
//     const client = new Client({
//       connectionString: connString
//     });
//     client.connect();
//     console.log("PostgreSQL Connected");
//   } catch (error) {
//     console.error(error.message);
//     process.exit(1);
//   }
// };

module.exports = connectDb;

// const db = new Pool({
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   port: process.env.PG_PORT
// });

// module.exports = db;
