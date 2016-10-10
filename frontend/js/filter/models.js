define(["app"], function(App) {
	App.module("StoreApp.Filter", function(Filter, App, Backbone, Marionette, $, _) {
		Filter.Model = Backbone.Model.extend();

		Filter.ModelToSave = Backbone.Model.extend({
			defaults: {
				filters: {
					group: '',
					color: [],
					maxFormat: [],
					doublePrint: [],
					brand: [],
					automaticFeed: [],
					doubleScan: [],
					format: [],
					kind: [],
					min: 0,
					max: 0
				}
			},
			url: 'api/filters',
			sync: function(method, model, options) {
        		options = options || {};
        		options.beforeSend = function (xhr) {
		            xhr.setRequestHeader('authenticity_token', (model.get('authenticity_token')));
        		};
        		return Backbone.Model.prototype.sync.apply(this, arguments);
    		}
		});
		var API = {
			getFilter: function(category) {
				var model = new Filter.Model();
				model.set('property', Config.property[category]);
				return model;
			},

			getModelToSave: function(category) {
				var model = new Filter.ModelToSave();
				var filters = model.get('filters');
				_.each(Config.filters, function(filter) {
					filters[filter] = [];
				});
				filters.group = category;
				return model;
			}
		}
		App.reqres.setHandler("get:filter", function(category) {
			return API.getFilter(category);
		});

		App.reqres.setHandler("get:filter:modeltosave", function(category) {
			return API.getModelToSave(category);
		});

	});
});