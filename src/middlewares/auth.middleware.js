function isAuthenticate(request, response, next) {
    if (request.user) {
        request.app.locals.user = request.user;
        return next();
    }
    request.app.locals.user = undefined;
    next();
}

module.exports = {
    isAuthenticate,
}