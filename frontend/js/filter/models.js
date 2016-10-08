define(["app"], function(App) {
	App.module("StoreApp.Filter", function(Filter, App, Backbone, Marionette, $, _) {
		Filter.Model = Backbone.Model.extend();
		var API = {
			getFilter: function(category) {
				var model = new Filter.Model();
				model.set('property', Config.property[category]);
				return model;
			}
		}
		App.reqres.setHandler("get:filter", function(category) {
			return API.getFilter(category);
		});
	});
});