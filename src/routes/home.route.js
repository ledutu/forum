var express = require('express');
const { HomeController } = require('../controllers');
var router = express.Router();

router.get('/', HomeController.index);

module.exports = router;