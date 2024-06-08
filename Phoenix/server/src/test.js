const pgp = require("pg-promise")();
const config = require("./config/db.config.js"); // Importing the default export from config.ts

const db = pgp(config.db);

console.log(`Database configuration: ${JSON.stringify(config.db)}`);

db.one("SELECT $1 AS message", "Hello, PostgreSQL!")
  .then((data) => {
    console.log("Database connection successful:");
    console.log(data.message); // Should log: Hello, PostgreSQL!
  })
  .catch((error) => {
    console.error("Error connecting to the database:");
    console.error(error);
  })
  .finally(() => {
    // Close the database connection pool
    pgp.end();
  });