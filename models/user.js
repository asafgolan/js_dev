var serverbone = require('serverbone');
var config = require('../config');
var errors = require('serverbone/lib/errors');
var bcrypt = require('bcryptjs');

var schema = {
  id: 'schema/user',
  type: 'object',
  permissions: {
    '*': ['create'],
    admin: ['*']
    },
  properties: {
    id: {
      type: 'integer'
    },
    username: {
      type: 'string'
    },
    password: {
      type: 'string',
      permissions: {
        admin: []
      }
    },
    roles: {
      type: 'array',
      default: []
    }
  }
};

var User = serverbone.models.ACLModel.extend({
  schema: schema,
  type: 'user',
  db: config.store,
  sync: config.store.sync,

  initialize: function(args, options)
  {
    // ANALYZE GET ROLES
    //this.addRoles(args);
    //options.actor = "hidden";


    serverbone.models.ACLModel.prototype.initialize.apply(this, args, options);
  },


  preSave: function( options )
  {

    if (this.isNew() && this.findOne( this.get('username') ) )
    {
      console.log("error");
      var errorObj =
      {
        msg: "Unprocessable entity",
        description: "Username '" + attrs.username + "' is already taken",
        errorCode: 422
      }
      return new errors.BaseError(null, errorObj);
    }
    else if (this.isNew() )
    {
      console.log("presave");
      var salt = bcrypt.genSaltSync(12);
      this.set("password", bcrypt.hashSync( this.get('password'), salt));
    }

  },

/*
  validate: function(attrs, options)
  {
    console.log("validate");
    //options.actor = "hidden";
    // how to define sign in action?
    if (this.isNew() && options.action === "read" && !this.checkPassword(this.attributes))
    {
      console.log("Incorrect credentials!");
    }

    if (this.isNew() && this.findOne(attrs.username))
    {
      var errorObj =
      {
        msg: "Unprocessable entity",
        description: "Username '" + attrs.username + "' is already taken",
        errorCode: 422
      }
      return new errors.BaseError(null, errorObj);
    }
    else if (this.isNew() && !this.findOne(attrs.username) && this.attributes.password)
    {
      var salt = bcrypt.genSaltSync(12);
      this.set("password", bcrypt.hashSync(this.attributes.password, salt));
    }

    serverbone.models.ACLModel.prototype.validate.apply(this, arguments);
  },
*/
  findOne: function(username)
  {

    var user;
    this.collection.fetch
    ({
        success: function(collection, response, options)
        {
          if (collection.findWhere({username: username}))
          {
            user = collection.findWhere({username: username});
          }
        }
    });
    console.log(user);
    return user;
  },

  /*userExists: function(username)
  {
    var exists = false;
    this.collection.fetch
    ({
        success: function(collection, response, options)
        {
          if (collection.findWhere({username: username}))
          {
            exists = true;
          }
        }
    });
    return exists;
  },*/

  checkPassword: function(attrs)
  {
    var isCorrect = false;
    this.collection.fetch
    ({
        success: function(collection, response, options)
        {
          if (collection.findWhere({username: attrs.username}))
          {
            console.log(response[0].password);
            isCorrect = bcrypt.compareSync(attrs.password, response[0].password);
          }
        }
    });
    return isCorrect;
  },



  addRoles: function()
  {

  }

  /**
   * addRoles
   *
   * This function should be implemented.
   *
   * Roles are unique, thus adding same role twice should not add it to roles twice.
   * Usage:
   * addRoles('a') -> adds role 'a'
   * addRoles('b', 'c') -> adds roles 'b' & 'c'
   * addRoles(['c', 'd', 'e']) -> adds roles 'd' & 'e'
   */



});



//user.save();


module.exports = User;
