// Backbone Model

var User = Backbone.Model.extend({
	defaults: {
		username: '',
		password: ''
	}
});

// Backbone Collection

var Users = Backbone.Collection.extend({
	url: 'http://localhost:9999/users'
});

/* instantiate two Users

var user1 = new User({
	username: 'cobra',
	password:'cobra_pass'
});

var user2 = new User({
	username: 'panter',
	password:'panter_pass'
});
*/
var users = new Users();

// Backbone View for one user


var UserView = Backbone.View.extend({
	model: new User(),
	tagName: 'tr',
	initialize: function() {
		this.template = _.template($('.users-list-template').html());
	},
/*  events: {
    'click .edit-user': 'edit',
    'click .update-user': 'update',
    'click .cancel': 'cancel',
    'click .delete-user': 'delete'
  },

  edit: function() {
    $('.edit-user').hide();
    $('.delete-user').hide();
    this.$('.update-user').show();
    this.$('.cancel').show();

    var username = this.$('.username').html();
    var password = this.$('.password').html();
    console.log('pass var = ', password);

    this.$('.username').html('<input type="text" class="form-control username-update" value="' + username + '">');
    this.$('.password').html('<input type="text" class="form-control password-update" value="' + password + '">');
  },

  update: function() {
    this.model.set('username', $('.username-update').val());
    this.model.set('password', $('.password-update').val());
		this.model.save(null, {
			success: function(response) {
				console.log('Successfully UPDATED user with  id: ' + response.toJSON().id);
			},
			error: function(err) {
				console.log('Failed to update user!');
			}
		});
  },

  cancel: function() {
      //console.log('hi from cancel func');
  		usersView.render();
  	},
  delete: function() {
  	this.model.destroy({
  		success: function(response) {
  				console.log('Successfully DELETED user with id: ' + response.toJSON().id);
  			},
  		error: function(err) {
  			console.log('Failed to delete user!');
			  }
  		});
  	},*/

  render: function() {
		var self = this;
		if(self.model.get('id')){
      self.$el.html(this.template(this.model.toJSON()));
    }
      return self;
  }
});

  // Backbone View for all users

var UsersView = Backbone.View.extend({
  model: users,
  el: $('.users-list'),
  initialize: function(){
    var self = this;
    this.listenTo(this.model,'sync', this.render);
    /*this.model.on('change', function() {
			setTimeout(function() {
				self.render();
			}, 30);
		},this);*/
    this.model.on('remove',this.render,this);

		this.model.fetch({
			success: function(response) {
				//console.log(response);
				_.each(response.toJSON(), function(item) {
					console.log('Successfully GOT user with id: ' + item.id);
				})
			},
			error: function() {
				console.log('Failed to get users!');
			}
		});
  },



  render: function() {
    var self = this;
    this.$el.html('');
    _.each(this.model.toArray(), function(user) {
      self.$el.append((new UserView({model: user})).render().$el);
    });
    return this;
  }
});

var usersView = new UsersView();

$(document).ready(function() {
	$('.add-user').on('click', function() {
		var user = new User({
			username: $('.username-input').val(),
			password: $('.password-input').val()
		});
    //console.log(user.toJSON());
		$('.username-input').val('');
		$('.password-input').val('');
		users.add(user);
		user.save(null,{
			success: function(model, response) {
				console.log('model ====',model.toJSON()/*,'Successfully SAVED user with id: ' + response.toJSON().id*/);
			},
			error: function(model, response) {
        alert(response.responseText);
    }
		});

	});
})
