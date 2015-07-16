module.exports = function() {
  var passport = require('passport');
  var passportLocal = require('passport-local');

  var models = require('../models');
  var collections = require('../collections');

  passport.use(new passportLocal.Strategy(function(username, password, next) {
    var attr = {username: username, password: password};
    var users = new collections.Users();

    /*
    users.create({
        username: username,
        password: password
    });
    console.log( 'USERS =====' ,users.toJSON());
*/
    users.fetch({ where: { username: username }})
    .then( function( err ){
            if(err){
              return next(err);
            }
            if( users.length == 1 ){
              var user = users.models[0];
              if( user.checkPassword( attr )){
                  console.log( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" );
                  return next( null, user );
              }
        }
        return next( null, false );
    });
  }
  ));




  passport.serializeUser( function( user, next ){
      next( null, user);
  });

  passport.deserializeUser( function( user , next ){
      next( null, user );
  });

}
