const mysql = require('mysql2');

const config = require('../config/config.json');
require('dotenv').config()

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD
});

/*const pool = mysql.createPool({
  host:config.host,
  user: config.user,
  database: config.database,
  password: config.password
});*/

module.exports = pool.promise();