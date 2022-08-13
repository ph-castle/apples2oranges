require('dotenv').config();
const { Pool } = require('pg');

// deployed connection
// const pool = new Pool({
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   port: process.env.PGPORT
// });

// local connection
const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE
});

module.exports = pool;