const { Client } = require('pg');
const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  require('dotenv').config();
}

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

client.connect();

module.exports = {
  query: (text, params, callback) => client.query(text, params, callback),
};