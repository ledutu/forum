var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
var mongoose = require('mongoose');
var i18n = require("i18n");
const session = require('express-session');

var rootRouter = require('./src/routes');
var databaseRouter = require('./src/database/seed/seed.route');
const { isMessage } = require('./src/middlewares/message.middleware');

var app = express();

require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'ejs');

// express-session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/src/public')));

app.use(passport.initialize());
app.use(passport.session());

app.use(i18n.init);

i18n.configure({
  locales: ['en', 'vi'],
  directory: __dirname + '/src/locales',
  cookie: 'lang',
  objectNotation: true
});

const { DB_HOST, DB_PORT, DB_NAME, ACCESS_TIMEOUT, MONGODB_URL } = process.env;

const mongoUrl = MONGODB_URL;

const db = mongoose.connection;

const connectWithRetry = function () {
  return mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err) => {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec', err)
      setTimeout(connectWithRetry, ACCESS_TIMEOUT)
    }
  })
}
connectWithRetry()

db.on('connected', () => {
  console.log('Connect DB Successful');
})

//Create DB
app.use('/database/create-database', databaseRouter);

app.use(isMessage);
app.use('/', rootRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  console.log(err)

  if (err.status === 404) {
    return res.render('404');
  } else {
    return res.render('500');
  }
});

module.exports = app;
