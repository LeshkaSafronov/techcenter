define(["app",
		"header/controllers",
		"footer/controllers",
		"help/views"], function(App) {
	App.module("StoreApp.Help", function(Help, App, Backbone, Marionette, $, _) {
		Help.Controller = Marionette.Controller.extend({
			initialize: function() {
				this.view = new Help.View();
				this.prepare();
				this.show();
			},

			prepare: function() {
				new App.StoreApp.Header.Controller();
				new App.StoreApp.Footer.Controller();
			},

			show: function() {
				App.sourceRegion.show(this.view);
			}

		});
	});
	return App.StoreApp.Help.Controller;
});