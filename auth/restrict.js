module.exports = function( req, res, next ){
    if( !req.isAuthenticated() ){
        res.redirect('/login');
    }
    else {
      console.log( ' ======');
      console.log(req.user)
      console.log( '======== ');
        //req.actor = req.user;
        next();
    }
};
