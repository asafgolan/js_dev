module.exports = function( req, res, next ){
    if( !req.isAuthenticated() ){
      //console.log('here no');
        res.redirect('/login');
    }
    else {
        //console.log('here yes');
        req.actor = req.user;
        next();
    }
};
