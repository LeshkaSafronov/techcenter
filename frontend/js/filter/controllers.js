define(["app",
		"filter/models",
		"filter/views"], function(App) {
	App.module("StoreApp.Filter", function(Filter, App, Backbone, Marionette, $, _) {
		Filter.Controller = Marionette.Controller.extend({
			initialize: function(options) {
				this.layout = options.layout;
				this.category = options.category;
				this.showFilter();
			},

			showFilter: function() {
				this.model = App.request('get:filter', this.category);
				this.view = new Filter.View({model: this.model, category: this.category});
				this.layout.showChildView('filterRegion', this.view);
			}
		});
	});
	return App.StoreApp.Filter.Controller;
});