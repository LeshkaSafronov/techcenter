define(["app"], function(App) {
	App.module("StoreApp.Errors", function(Errors, App, Backbone, Marionette, $, _) {
		Errors.Model = Backbone.Model.extend();
		Errors.Collection = Backbone.Collection.extend({
			model: Errors.Model
		});
		var API = {
			getCollection: function(options) {
				var collection = new Errors.Collection(); 
				var errors = options.responseJSON;
				for (errorName in errors) {
					var data = typeof errors[errorName] === "string" ? [errors[errorName]] : errors[errorName];
					_.each(data, function(e) {
						collection.add({error: e});
					});
				}
				return collection;
			}
		}
		App.reqres.setHandler("get:errors", function(options) {
			return API.getCollection(options);
		});
	});
});