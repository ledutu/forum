var express = require('express');
const { AuthController } = require('../controllers');
var router = express.Router();
// var auth = require('../../config/auth');
// const { isAuthenticate } = require('../../middlewares/user/auth.middleware');

router.get('/login', AuthController.getLogin);
router.post('/login', AuthController.postLogin);
router.post('/sign-up', AuthController.postSignUp);

module.exports = router;