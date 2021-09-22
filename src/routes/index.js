var express = require('express');
var router = express.Router();
var authRouter = require('./auth.route');
var homeRouter = require('./home.route');
var utilRouter = require('./util.route');

var { isAuthenticate } = require('../middlewares/auth.middleware');

router.use('/auth', authRouter);

router.use(isAuthenticate);
router.use('/', homeRouter);
router.use('/util', utilRouter);

module.exports = router;
