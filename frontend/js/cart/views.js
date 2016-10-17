define(["app",
		"tpl!templates/cart/cart.tpl"], function(App, cartTpl) {
	App.module("StoreApp.Cart", function(Cart, App, Backbone, Marionette, $, _) {
		Cart.View = Marionette.ItemView.extend({
			template: cartTpl
		});
	});
});