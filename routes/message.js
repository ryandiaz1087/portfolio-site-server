const express = require('express');
const { getSingleMessage, createMessage, getMessages } = require('../controllers/message');

const router = express.Router();

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();
});

router.route('/createmessage').post(createMessage);
router.route('/getmessages').get(getMessages);
router.route('/getsinglemessage').get(getSingleMessage);

module.exports = router;

