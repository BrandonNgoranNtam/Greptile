// db.js

const { Pool } = require("pg");
const config = require("../../config/db.config");

const pool = new Pool(config.db);

const context = {};

async function query(text, params) {
  const start = Date.now();
  const client = context.client || pool;
  const result = await client.query(text, params);
  const duration = Date.now() - start;
  console.log("Executed query:", { text, duration, rows: result.rowCount });
  return result;
}

async function runTransaction(callback) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    context.client = client;
    await callback();
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    context.client = null;
    client.release();
  }
}

module.exports = { query, runTransaction };
