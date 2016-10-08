define(["app",
		"show/models",
		"search/models",
		"search/views",
		"header/controllers",
		"footer/controllers",
		"menu/views",
		"filter/views",
		"loading/views"], function(App) {
	App.module("StoreApp.Search", function(Search, App, Backbone, Marionette, $, _) {
		Search.Controller = Marionette.Controller.extend({
			initialize: function(options) {
				new App.StoreApp.Header.Controller();
				new App.StoreApp.Footer.Controller();
				var pageLayout = new Search.PageLayout();
				App.sourceRegion.show(pageLayout);
				this.collection = App.request("search:entities", options);
				var self = this;
				this.loading = new App.StoreApp.Loading.View({collection: this.collection});
				pageLayout.showChildView('loadingRegion', this.loading);
				this.view = new Search.CompositeView({
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
	return App.StoreApp.Search.Controller;
});

