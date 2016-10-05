define(["app",
		"header/controllers",
		"logout/models",
		"user/models",
		"user/views"], function(App) {
	App.module("StoreApp.User", function(User, App, Backbone, Marionette, $, _) {
		User.Controller = Marionette.Controller.extend({
			initialize: function(id) {
				new App.StoreApp.Header.Controller();
				this.model = App.request('get:user', id);
				this.layout = new User.Layout();
				this.userView = new User.View({model: this.model});
				
				this.ordersView = new User.OrdersView();

				this.listenTo(this.userView, 'user:logout', this.logout);	
				this.showUser();
			},
			showUser: function() {
				App.sourceRegion.show(this.layout);
				this.layout.showChildView('userRegion', this.userView);
				this.layout.showChildView('ordersRegion', this.ordersView);
			},
			getAuthenticityToken: function(id) {
				return $.get('/api/user/' + id);
			},
			logout: function(id) {
				var tokenPromise = this.getAuthenticityToken(id);
				tokenPromise.done(function(response) {
					var token = App.parseToken(response);
					var logoutModel = new App.StoreApp.Logout.Model();
					logoutModel.set('authenticity_token', token);
					logoutModel.save().done(function() {
						Backbone.history.navigate('', true);
					});
				});
			}

		});
	});
	return App.StoreApp.User.Controller;
});