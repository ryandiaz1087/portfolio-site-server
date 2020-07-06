const db = require('../config/db');
const bcrypt = require('bcryptjs');
const { getUserId, hashPassword, generateToken } = require('../utils/index');
const { CREATE_MESSAGE, GET_MESSAGES, GET_SINGLE_MESSAGE } = require('./queries');

// @desc      GET all privateMessages
// @route     GET /api/v1/privateMessages
// @access      Public
exports.getMessages = async (req, res, next)  => {
  try {
    const privateMessages = await PrivateMessage.find();

    // res.status(200).json({
    //   success: true,
    //   count: privateMessages.length,
    //   data: privateMessages,
    // });
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

// @desc      Create new privateMessage
// @route     POST /api/v1/privateMessages
// @access      Private
exports.createMessage = async (req, res, next)  => {
  try {
    

    // res.status(201).json({
    //   success: true,
    //   data: privateMessage,
    // });
  } catch(error) {
    console.log(error);
    // res.status(400).json({
    //   success: false,
    // });
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