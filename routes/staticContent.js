const express = require('express');
const { createStaticContent, getAllStaticContent } = require('../controllers/staticContent');
const router = express.Router();

router.route('/').post(createStaticContent);
router.route('/').get(getAllStaticContent);

module.exports = router;
