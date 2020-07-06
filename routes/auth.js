const express = require('express');
const { createUser, login, getUser } = require('../controllers/auth');

const router = express.Router();

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept, X-Access-Token, x-auth-token");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  next();
});

router.route('/createuser').post(createUser);
router.route('/login').post(login);
router.route('/persistuser').get(getUser);

module.exports = router;