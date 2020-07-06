const PrivateMessage = require('../models/PrivateMessages');

// @desc      GET all privateMessages
// @route     GET /api/v1/privateMessages
// @access      Public
exports.getPrivateMessages = async (req, res, next)  => {
  try {
    const privateMessages = await PrivateMessage.find();

    res.status(200).json({
      success: true,
      count: privateMessages.length,
      data: privateMessages,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
}

// @desc      GET single privateMessage
// @route     GET /api/v1/privateMessages/:id
// @access      Public
exports.getPrivateMessage = async (req, res, next)  => {
  try {
    const privateMessage = await PrivateMessage.findById(req.params.id);

    if (!privateMessage) {
      return res.status(400).json({
        success: false,
      })
    }

    res.status(200).json({
      success: true,
      data: privateMessage,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
}

// @desc      Create new privateMessage
// @route     POST /api/v1/privateMessages
// @access      Private
exports.createPrivateMessage = async (req, res, next)  => {
  try {
    const privateMessage = await PrivateMessage.create(req.body);

    res.status(201).json({
      success: true,
      data: privateMessage,
    });
  } catch(error) {
    res.status(400).json({
      success: false,
    });
  }

}

// @desc      Delete new privateMessage
// @route     DELTE /api/v1/privateMessages/:id
// @access      Private
exports.deletePrivateMessage = async (req, res, next)  => {
  try {
    const privateMessage = await PrivateMessage.findByIdAndDelete(req.params.id);
  
    if (!privateMessage) {
      return res.status(400).json({
        success: false,
      });
    }
  
    res.status(200).json({
      success: true,
      data: privateMessage,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
}