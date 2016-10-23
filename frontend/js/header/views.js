define(["app",
		"tpl!templates/header/header-layout.tpl",
		"tpl!templates/header/header.tpl"], function(App, headerLayoutTpl, headerTpl) {
	App.module("StoreApp.Header", function(Header, App, Backbone, Marionette, $, _) {
		Header.Layout = Marionette.LayoutView.extend({
			template: headerLayoutTpl,
			regions: {
				headerRegion: '#header-region',
	 			menuRegion: '#menu-region-header'
	 		},
		});

		Header.View = Marionette.ItemView.extend({
			template: headerTpl,
			events: {
				'click #login': 'login',
				'click #main' : 'main',
				'click #submit' : 'clickSearch',
				'click #help' : 'help',
				'click #cart' : 'cart',
				'keypress #search' : 'search',
				'click #nav-mobile' : 'navMobile'
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

	 		help: function() {
	 			Backbone.history.navigate('help', true);
	 		},

	 		cart: function() {
	 			Backbone.history.navigate('cart', true);
	 		},

	 		search: function(e) {
	 			if (e.keyCode == 13) {
	 				Backbone.history.navigate('search?query=' + this.$('#search').val(), true);
	 			}
	 		},

	 		clickSearch: function(e) {
	 			Backbone.history.navigate('search?query=' + this.$('#search').val(), true);
	 		},

	 		navMobile: function() {
	 			this.trigger('show:navMobile');
	 		},

	 		serializeData: function() {
	 			var data = _.extend(this.userModel.toJSON(), {sum: this.sum});
	 			return data;
	 		}
		});
	});
});