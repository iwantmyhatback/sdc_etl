const { Pool } = require('pg');
const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  idleTimeoutMillis: 5000,
});

pool.connect();

module.exports.connection = pool;
