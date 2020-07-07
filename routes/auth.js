const express = require('express');
const { createUser, login, getUser } = require('../controllers/auth');

const router = express.Router();

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  next();
});

router.route('/createuser').post(createUser);
router.route('/login').post(login);
router.route('/persistuser').get(getUser);

module.exports = router;