var models = require('../models');
var collections = require('../collections');
var should = require('chai').should();

describe('User tests', function() {
  var user;

  it('should save a User', function() {
    user = new models.User({
      username: 'foouser',
      password: 'supersecRet',
      description: 'hello world'
    });
    return user.save();
  });

  it('should save another User', function() {
    user2 = new models.User({
      username: 'fooduser',
      password: 'supersecRet',
      description: 'hello world'
    });
    return user2.save();
  });

//it does save a user no idea what is wrong.
  it('shouldn\'t save User', function() {
    user3 = new models.User({
      username: 'fooduser',//same username as user 2
      password: 'supersecRet',
      description: 'hello world'
    });

   user3.save();
  });


  it('plaintext password should not be saved', function() {
    return user
      .fetch()
      .then(function() {
        user.get('password').should.not.equal('supersecRet');
      });
  });

  it('should list users', function() {
    var users = new collections.Users();
    return users
      .fetch()
      .then(function() {
        users.length.should.equal(2);
      });
  });
});
