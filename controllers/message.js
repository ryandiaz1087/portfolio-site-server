const db = require('../config/db');
const bcrypt = require('bcryptjs');
const { getUserId, hashPassword, generateToken } = require('../utils/index');
const { CREATE_MESSAGE, GET_MESSAGES, GET_SINGLE_MESSAGE } = require('./queries');

// This route needs to authenticate the requester
exports.getMessages = async (req, res, next)  => {
  try {
    const result = await db.query(GET_MESSAGES);
    console.log(result);

    res.status(200).json({
      success: true,
      count: result.rowCount,
      data: result.rows,
    });
  } catch (error) {
    console.log(error);
    // res.status(400).json({
    //   success: false,
    // });
  }
}

// @desc      GET single privateMessage
// @route     GET /api/v1/privateMessages/:id
// @access      Public
exports.getSingleMessage = async (req, res, next)  => {
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

// @desc      Delete new privateMessage
// @route     DELTE /api/v1/privateMessages/:id
// @access      Private
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