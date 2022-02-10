const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  username: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DB,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DB_DIALECT,
};
