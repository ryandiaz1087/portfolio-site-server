const CREATE_USER = `INSERT INTO "User"(first_name, last_name, email, password) VALUES ($1, $2, $3, $4);`;
const FIND_USER = `SELECT * FROM "User" WHERE email = $1;`;
const GET_USER = `SELECT * FROM "User" WHERE id = $1;`;

const CREATE_MESSAGE = `INSERT INTO "Message"(sender_email, msg) VALUES ($1, $2);`;
const GET_MESSAGES = `SELECT * FROM "Message";`;
const GET_SINGLE_MESSAGE = `SELECT * FROM "Message" WHERE id = $1;`;

module.exports = {
  CREATE_USER,
  FIND_USER,
  GET_USER,
  CREATE_MESSAGE,
  GET_MESSAGES,
  GET_SINGLE_MESSAGE,
}