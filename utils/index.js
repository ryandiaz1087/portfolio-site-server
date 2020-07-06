const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { isNil } = require('lodash');


const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7 days' });
};

const getUserId = (req) => {
  const header = req.headers.authorization;

  if (isNil(header)) {
    throw new Error('NO_AUTH_HEADER');
  }

  const token = header.replace('Bearer ', '');

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return decoded.userId;
}

const hashPassword = (password) => {
  if (password.length < 8) {
    throw new Error('Password must be 8 characters or longer.');
  }

  return bcrypt.hash(password, 10);
}

module.exports = { hashPassword, generateToken, getUserId };