var express = require('express');
const { UtilController } = require('../controllers');
var router = express.Router();

/* GET home page. */
router.get('/delete-message-session', UtilController.deleteMessageSession);

module.exports = router;
