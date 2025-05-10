module.exports.isLoggedIn = (req, res, next)=> {
    req.session.redirectUrl = req.originalUrl;
    if(!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=> {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
} 