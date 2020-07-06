const express = require('express');
const { getSingleMessage, createMessage, getMessages } = require('../controllers/message');

const router = express.Router();

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept, X-Access-Token, x-auth-token");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  next();
});

router.route('/createmessage').post(createMessage);
router.route('/getmessages').get(getMessages);
router.route('/getsinglemessage').get(getSingleMessage);

module.exports = router;

