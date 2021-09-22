var express = require('express');
var bcrypt = require('bcrypt');
const auth = require('../config/auth');

function getLogin(request, response) {
    try {
        response.render('login');
    } catch (error) {
        console.error(error);
    }
}

function getSignUp(request, response) {
    try {
        response.render('signup');
    } catch (error) {
        console.error(error);
    }
}

function postLogin(request, response, next) {
    auth.authenticate('local', (err, user, info) => {
        if (err) {
            request.session.message = {
                status: 'error',
                content: err.message,
            }
            console.log('test', request.session.message)
            
            return response.redirect('/auth/login');
        }
        

        if (user) {
            request.logIn(user, {}, function (error) {
                if (error) {
                    request.session.message = {
                        status: 'error',
                        content: err.message,
                    }
                    return response.redirect('/auth/login');
                }

                request.session.message = {
                    status: 'success',
                    content: 'Đăng nhập thành công',
                }

                return response.redirect('/');
            })
        }
    })(request, response, next);
    return;
}

function postSignUp(request, response) {

}

module.exports = {
    getLogin,
    postLogin,
    postSignUp,
}