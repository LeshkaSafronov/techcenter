define(["app",
		"tpl!templates/user/layout.tpl",
		"tpl!templates/user/user.tpl",
		"tpl!templates/user/orders.tpl"], function(App, layoutTpl, userTpl, ordersTpl) {
	App.module("StoreApp.User", function(User, App, Backbone, Marionette, $, _) {
		User.Layout = Marionette.LayoutView.extend({
			template: layoutTpl,
			regions: {
				userRegion: '#user-region',
				ordersRegion: '#orders-region'
			}
		});
		
		User.View = Marionette.ItemView.extend({
			template: userTpl,
			
			initialize: function() {
				this.model.on('sync', this.render);
			},

			events: {
				'click #edit' : 'edit',
				'click #logout' : 'logout'
			},

			edit: function(e) {
				e.preventDefault();
			},

			logout: function(e) {
				e.preventDefault();
				this.trigger('user:logout', this.model.id);
			}
		});

		User.OrdersView = Marionette.ItemView.extend({
			template: ordersTpl
		});
	});
});