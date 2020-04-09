const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  user: "hackreactor",
  password: "password",
  database: "sdc",
  idleTimeoutMillis: 5000,
});

pool.connect();

// pool.query("SELECT COUNT(*) FROM reviews", (error, result) => {
//   console.log(error ? error.stack : result.rows[0]);
//   pool.end();
// });

module.exports.connection = pool;
