define(["app"], function(App) {
	App.module("StoreApp.Cart", function(Cart, App, Backbone, Marionette, $, _) {
		Cart.Model = Backbone.Model.extend({
			defaults: {
				cart: {},
				items: {},
				count: {}
			},

			url: function() {
				return 'api/cart/' + this.id;
			}
		});
		var API = {
			getCart: function() {
				var promise = App.getCart();
				var model = new Cart.Model();
				promise.done(function() {
					model.set('id', $.cookie('log_cart') ? +$.cookie('log_cart') : +$.cookie('stgr_cart'));
					model.fetch();
				});
				return model;
			},
		}
		App.reqres.setHandler('get:cart', function() {
			return API.getCart();
		});
	});
});