define(["app"], function(App) {
	App.module("StoreApp.Search", function(Search, App, Backbone, Marionette, $, _) {
		Search.Model = Backbone.Model.extend({
			defaults: {
				'printer_photo' : '/images/printer.png',
				'rating' : 8
			}
		});
		Search.Collection = Backbone.Collection.extend({
			model: Search.Model,
			initialize: function(models, options) {
				this.options = options;
				this.options.page = +this.options.page || 1;
				this.options.per_page = +this.options.per_page || Config.per_page;
			},
			url: function() {
				urlFetch = '/'+this.options.name + '?';
				var arr = [];
				for (key in this.options) {
					if (key === 'name') {
						continue;
					}
					arr.push(key + '=' + this.options[key]);
				}
				return 'api'+urlFetch+arr.join('&');
			},
			parse: function(response) {
				this.count = response.count;
				return response.data;
			}
		});
		var API = {
			getSearch: function(options) {
				var collection = new Search.Collection([], options);
				collection.fetch();
				return collection;
			}
		};
		App.reqres.setHandler("search:entities", function(options) {
			return API.getSearch(options);
		});
	});
});