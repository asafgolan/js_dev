var serverbone = require('serverbone');
var config = require('../config');
var errors = require('serverbone/lib/errors');
var bcrypt = require('bcryptjs');

var schema = {
  id: 'schema/user',
  type: 'object',
  permissions: {
       '*': ['create'],
       demo: ['read','create'],
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
      type: 'string'
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
    //_.bindAll(this, 'userExists')
    //console.log(this.isNew(), options);
  console.log('here');
  User.__super__.initialize.apply( this, arguments );
  },

  validate: function(attrs, options)
  {
    if (this.isNew() && options.action === "read" && this.checkPassword(this.attributes))
    {
      var user = this;
      console.log('here');
      return user;
    }

    //options.actor = "hidden";
    // how to define sign in action?
    if (!this.isNew() && !this.checkPassword(this.attributes))
    {
      console.log("Incorrect credentials!");
    }

    if (this.isNew() && this.userExists(attrs.username))
    {
      var errorObj =
      {
        msg: "Unprocessable entity",
        description: "Username '" + attrs.username + "' is already taken",
        errorCode: 422
      }
      return new errors.BaseError(null, errorObj);
    }
    else if (this.isNew() && !this.userExists(attrs.username) && this.attributes.password)
    {
      var salt = bcrypt.genSaltSync(12);
      this.set("password", bcrypt.hashSync(this.attributes.password, salt));
    }

    serverbone.models.ACLModel.prototype.validate.apply(this, arguments);
  },
//how can i pass
  userExists: function(username)
  {

    var user ;
    if(this.collection){
    this.collection.fetch
    ({
        success: function(collection, response, options)
        {
          if (collection.findWhere({username: username}))
          {
            user = collection.findWhere({username: username});
            //console.log('userexsits' ,  user );
          }
        }
    });
  }
    return user;
  },

  checkPassword: function(attrs)
  {
    return bcrypt.compareSync(attrs.password, this.get('password'));
  },

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

/*var user = new User({
  username:'panda',
  password:'panda_123'
});

user.save();*/


module.exports = User;
