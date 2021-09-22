var express = require('express');

function index(request, response) {
    try {
        response.render('home');
    } catch (error) {
        
    }
}

module.exports = {
    index
}