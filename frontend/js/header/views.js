define(["app",
		"tpl!templates/header/header.tpl"], function(App, headerTpl) {
	App.module("StoreApp.Header", function(Header, App, Backbone, Marionette, $, _) {
		Header.View = Marionette.ItemView.extend({
			template: headerTpl,
			events: {
				'click #login': 'login',
				'click #main' : 'main',
				'click #submit' : 'clickSearch',
				'keypress #search' : 'search'
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

	 		search: function(e) {
	 			if (e.keyCode == 13) {
	 				Backbone.history.navigate('search?query=' + this.$('#search').val(), true);
	 			}
	 		},

	 		clickSearch: function(e) {
	 			Backbone.history.navigate('search?query=' + this.$('#search').val(), true);
	 		},

	 		serializeData: function() {
	 			var data = _.extend(this.userModel.toJSON(), {sum: this.sum});
	 			return data;
	 		}
		});
	});
});