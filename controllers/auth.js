const db = require('../config/db');
const bcrypt = require('bcryptjs');
const { getUserId, hashPassword, generateToken } = require('../utils/index');
const { CREATE_USER, FIND_USER, GET_USER } = require('./queries');

exports.createUser = async (req, res, next) => {
  const firstName = req.body.firstName.toLowerCase();
  const lastName = req.body.lastName.toLowerCase();
  const email = req.body.email.toLowerCase();
  const password = await hashPassword(req.body.password, 10);
  console.log(CREATE_USER)

  try {
    const { rowCount } = await db.query(CREATE_USER, [firstName, lastName, email, password]);

    res.status(200).json({
      success: true,
      count: rowCount,
      data: { firstName, lastName, email },
    });
  } catch (error) {
    res.status(400).json({ succes: false, title: error.name, msg: error.message });
  }
}

exports.login = async (req, res, next) => {
  try {
    const result = await db.query(FIND_USER, [req.body.email]);
    
    if (result.rowCount === 0) {
      const err = new Error('This email was not found in our database.');
      err.name = 'USER_NOT_FOUND';

      throw err;
    }
  
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(req.body.password, user.password);
  
    if (isMatch === false) {
      const err = new Error('Password is found to be incorrect.');
      err.name = 'INVALID_PASSWORD';

      throw err;
    };
    
    res.status(200).json({
      success: true,
      user: {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        access: user.access,
      },
      token: generateToken(user.id),
    });
  } catch (error) {
    let title = error.name;
    let msg;

    if (error.name === 'USER_NOT_FOUND') {
      msg = error.message;
    } else if (error.name === 'INVALID_PASSWORD') {
      msg = error.message;
    } else {
      title = 'UNKNOWN';
      msg = 'An Unknown Server Error occurred.';
    }

    res.status(400).json({ success: false, title, msg });
  }
}

exports.getUser = async (req, res, next) => {
  try {
    const userId = getUserId(req);

    const { rows } = await db.query(GET_USER, [userId]);
    const user = rows[0];
    res.status(200).json({ success: true, firstName: user.first_name, lastName: user.last_name, email: user.email, access: user.access });
  } catch (error) {
    let title;
    let msg;
    if (error.name === 'JsonWebTokenError') {
      title = error.name;
      msg = error.message;
    } else {
      title = 'UNKNOWN';
      msg = 'An unknown server error occurred.';
    }

    res.status(400).json({ success: false, title, msg });
  }
}