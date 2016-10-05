define(["app"], function(App) {
	App.module("StoreApp.User", function(User, App, Backbone, Marionette, $, _) {
		User.Model = Backbone.Model.extend({
			defaults: {
				name: '',
				email: '',
				address: '',
				number: ''
			},
			
			url: function() {
				return 'api/users/' + this.id;
			},
		});
		
		var API = {
			getUser: function(id) {
				var model = new User.Model({id: id});
				model.fetch();
				return model;
			}
		}

		App.reqres.setHandler('get:user', function(id) {
			return API.getUser(id);
		});
	});
});