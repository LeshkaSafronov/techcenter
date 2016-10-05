define(["app",
		"errors/models",
		"errors/views"], function(App) {
	App.module("StoreApp.Errors", function(Errors, App, Backbone, Marionette, $, _) {
		Errors.Controller = Marionette.Controller.extend({
			initialize: function(options) {
				this.layout = options.layout;
				this.response = options.response;
				this._buildErrors();
			},

			_buildErrors: function() {
				this.collection = App.request("get:errors", this.response);
				this.view = new Errors.ErrorsView({collection: this.collection});
				this.layout.showChildView('errorsRegion', this.view);
			}
		});
	});
	return App.StoreApp.Errors.Controller;
});