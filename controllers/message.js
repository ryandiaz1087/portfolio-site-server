const db = require('../config/db');
const bcrypt = require('bcryptjs');
const { getUserId, hashPassword, generateToken } = require('../utils/index');
const { CREATE_MESSAGE, GET_MESSAGES, GET_SINGLE_MESSAGE } = require('./queries');
const { fromPairs } = require('lodash');

exports.getMessages = async (req, res, next)  => {
  try {
    getUserId(req);  // If user is not authenticated an error is thrown.

    const result = await db.query(GET_MESSAGES);

    res.status(200).json({
      success: true,
      count: result.rowCount,
      data: result.rows,
    });
  } catch (error) {
    let title = error.name;
    let message = error.message;

    if (error.name === 'JsonWebTokenError') {
      title = 'UNAUTHENTICATED';
      message = 'This user is unauthenticated. Please sign in.';
    } else if (title === 'TokenExpiredError') {
      title = 'EXPIRED_TOKEN';
      message = 'User\'s token is expired and needs to login.';
    }

    res.status(400).json({
      success: false,
      title,
      message,
    });
  }
}

// @desc      
// @route     
// @access
exports.getSingleMessage = async (req, res, next)  => {
  try {
    getUserId(req);  // If user is not authenticated an error is thrown.
    const userId = getUserId(req);
    const id = req.body.id;
    const { rows } = await db.query(GET_SINGLE_MESSAGE, [id]);

    const { sender_email: from, msg } = rows[0];

    res.status(200).json({
      success: true,
      data: { from, msg },
    });
  } catch (error) {
    console.log(error);
    let title = error.name;
    let message = error.message;

    if (title === 'JsonWebTokenError') {
      title = 'UNAUTHENTICATED';
      message = 'This user is unauthenticated. Please sign in.';
    } else if (title === 'TokenExpiredError') {
      title = 'EXPIRED_TOKEN';
      message = 'User\'s token is expired and needs to login.';
    }

    res.status(400).json({
      success: false,
      title,
      message,
    });
  }
}

// This route is error handled enough for now may need to revisit once connected to the front-end
exports.createMessage = async (req, res, next)  => {
  try {
    if (req.body.sender_email.length === 0) {
      const err = new Error('You must provide an return email.');
      err.name = 'NO EMAIL PROVIDED';

      throw err;
    }

    if (req.body.msg < 8) {
      const err = new Error('You must provide a message with at least 8 characters.');
      err.name = 'MESSAGE LENGTH';
      throw err;
    }

    const sender_email = req.body.sender_email;
    const msg = req.body.msg;

    const { rowCount } = await db.query(CREATE_MESSAGE, [sender_email, msg]);

    res.status(200).json({ success: rowCount > 0 && true });
  } catch(error) {
    res.status(400).json({
      success: false,
      title: error.name,
      message: error.message,
    });
  }

}

// @desc
// @route
// @access
exports.deletePrivateMessage = async (req, res, next)  => {
  try {

  
    // res.status(200).json({
    //   success: true,
    //   data: privateMessage,
    // });
  } catch (error) {
    console.log(error);
    // res.status(400).json({
    //   success: false,
    // });
  }
}