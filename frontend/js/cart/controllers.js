define(["app",
		"cart/models",
		"cart/views"], function(App) {
	App.module("StoreApp.Cart", function(Cart, App, Backbone, Marionette, $, _) {
		Cart.Controller = Marionette.Controller.extend({
			initialize: function() {
				this.prepare();
				this.model = App.request('get:cart');
				this.collection = App.request('get:cartCollection');
				this.view = new Cart.View({collection: this.collection});
				var self = this;
				this.show();
			},

			show: function() {
				App.sourceRegion.show(this.view);
			},

			prepare: function() {
				require(['header/controllers', 'footer/controllers'], function(HeaderController, FooterController) {
					new HeaderController();
					new FooterController();
				});
			}
		});
	});
	return App.StoreApp.Cart.Controller;
});