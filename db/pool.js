const { Pool } = require("pg");

// Following props should be read from env vars
module.exports = new Pool({
    host: process.env.PG_HOST, // or wherever db is hosted
    user: process.env.PG_USER,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT, // The default port
});