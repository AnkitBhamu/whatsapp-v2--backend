const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

function initialise_client(user, password, database, port, host) {
  let client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASS.toString(),
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
  });

  return client;
}

module.exports = initialise_client();
