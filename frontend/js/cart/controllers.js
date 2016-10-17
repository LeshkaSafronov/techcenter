define(["app",
		"cart/models",
		"cart/views"], function(App) {
	App.module("StoreApp.Cart", function(Cart, App, Backbone, Marionette, $, _) {
		Cart.Controller = Marionette.Controller.extend({
			initialize: function() {
				this.prepare();
				this.model = App.request('get:cart');
				this.view = new Cart.View();
				var self = this;
				this.listenTo(this.model, 'sync', function() {
					console.log(self.model.toJSON());
				});
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