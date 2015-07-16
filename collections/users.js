var serverbone = require('serverbone');
var models = require('../models');
var config = require('../config');

var Users = serverbone.collections.ACLCollection.extend({
  type: 'users',
  model: models.User,
  db: config.store,
  sync: config.store.sync,
  //why is it imortant i dont know?
  initialize: function(models, options) {
       Users.__super__.initialize.apply(this, arguments);
   }
});

module.exports = Users;
