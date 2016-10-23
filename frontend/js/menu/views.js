define(["app", 
		"tpl!templates/menu/menu.tpl",
		"tpl!templates/menu/menu-mobile.tpl"], function(App, menuTpl, menuMobileTpl) {
	App.module("StoreApp.Menu", function(Menu, App, Backbone, Marionette, $, _) {
		Menu.DesktopView = Marionette.ItemView.extend({
			template: menuTpl,
			events: {
				'click .nav' : 'nav',
			},
			columns: ['printers', 'mfus', 'scanners', 'papers', 'cartridges', 'laminators', 'bookbinders', 'others'],
			nav: function(e) {
				App.trigger("route:menu", e.currentTarget.id);
			},
			serializeData: function() {
				var data = {};
				data.columns = this.columns;
				return data;
			}
		});

		Menu.MobileView = Marionette.ItemView.extend({
			template: menuMobileTpl,
			events: {
				'click .nav' : 'nav',
				'click #login': 'login',
				'click #help' : 'help',
				'click #cart' : 'cart'
			},
			columns: ['printers', 'mfus', 'scanners', 'papers', 'cartridges', 'laminators', 'bookbinders', 'others'],
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

	 		login: function() {
	 			Backbone.history.navigate('login', true);
	 		},

	 		help: function() {
	 			Backbone.history.navigate('help', true);
	 		},

	 		cart: function() {
	 			Backbone.history.navigate('cart', true);
	 		},

			nav: function(e) {
				App.trigger("route:menu", e.currentTarget.id);
			},

			serializeData: function() {
				var data = _.extend(this.userModel.toJSON(), {sum: this.sum});
				data.columns = this.columns;
				return data;
			},

			onShow: function() {
				this.$el.hide();
			}
		});
	});
	return App.StoreApp.Menu.View;
});
