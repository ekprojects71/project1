require("dotenv").config();
//import postgres pool object
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

pool.connect();

//exports
module.exports = pool;