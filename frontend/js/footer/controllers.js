define(["app",
		"footer/views"], function(App) {
	App.module("StoreApp.Footer", function(Footer, App, Backbone, Marionette, $, _) {
		Footer.Controller = Marionette.Controller.extend({
			initialize: function() {
				this.showFooter();
			},

			showFooter: function() {
				this.view = new Footer.View();
				App.footerRegion.show(this.view);
			}
		});
	});
	return App.StoreApp.Footer.Controller;
});