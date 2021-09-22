var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');

require('dotenv').config()

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: true,
    passReqToCallback: true,
}, function (request, email, password, done) {
    User.authenticate(email, password.toString(), result => {
        return done(null, result);
    }, err => {
        return done(err, false)
    })
}));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = passport;