define(["app",
		"tpl!templates/header/header.tpl"], function(App, headerTpl) {
	App.module("StoreApp.Header", function(Header, App, Backbone, Marionette, $, _) {
		Header.View = Marionette.ItemView.extend({
			template: headerTpl,
			events: {
				'click #login': 'login',
				'click #main' : 'main'
	 		},

	 		initialize: function(options) {
	 			this.userModel = options.userModel;
	 			this.cartModel = options.cartModel;
	 			var self = this;
	 			this.cartModel.on('sync', function() {
	 				var count = _.values(this.cartModel.get('count'));
	 				var sum = _.reduce(count, function(memo, num) {
	 					return memo + num;
	 				});
	 				this.sum = sum || 0;
	 				this.render();
	 			}.bind(this));
	 		},

	 		main: function() {
	 			Backbone.history.navigate('', true);
	 		},

	 		login: function() {
	 			Backbone.history.navigate('login', true);
	 		},

	 		serializeData: function() {
	 			var data = _.extend(this.userModel.toJSON(), {sum: this.sum});
	 			return data;
	 		}
		});
	});
});