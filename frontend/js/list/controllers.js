define(["app",
		"show/models",
		"list/models",
		"list/views",
		"header/controllers",
		"footer/controllers",
		"menu/views",
		"filter/views",
		"loading/views"], function(App) {
	App.module("StoreApp.List", function(List, App, Backbone, Marionette, $, _) {
		List.Controller = Marionette.Controller.extend({
			initialize: function(options) {
				new App.StoreApp.Header.Controller();
				new App.StoreApp.Footer.Controller();
				var pageLayout = new List.PageLayout();
				App.sourceRegion.show(pageLayout);
				pageLayout.showChildView('menuRegion', new App.StoreApp.Menu.View());
				pageLayout.showChildView('filterRegion', new App.StoreApp.Filter.View());
				this.collection = App.request("list:entities", options);
				var self = this;
				this.loading = new App.StoreApp.Loading.View({collection: this.collection});
				pageLayout.showChildView('loadingRegion', this.loading);
				this.view = new List.CompositeView({
					collection: this.collection,
				});
				this.listenTo(this.loading, 'view:sync', function() {
					pageLayout.showChildView('listRegion', this.view);
				}.bind(this));



				this.listenTo(this.view, 'childview:view:addItem', function(childView, quantity) {
					addItem = App.request('get:addItem', childView.model.id);
					var token = self.getAuthenticityToken();
					token.done(function(response) {
						authToken = App.parseToken(response);
						addItem.set({
							'quantity': quantity,
							'authenticity_token': authToken
						});
						addItem.save().done(function() {
							App.trigger('update:cart');
						});
					}); 
				});
			},

			getAuthenticityToken: function() {
				return $.get('/api/show/' + this.id);
			}
		});
	});
	return App.StoreApp.List.Controller;
});