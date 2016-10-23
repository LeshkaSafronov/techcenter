define(["app",
		"show/models",
		"list/models",
		"list/views",
		"menu/views",
		"cart/models",
		"loading/views"], function(App) {
	App.module("StoreApp.List", function(List, App, Backbone, Marionette, $, _) {
		List.Controller = Marionette.Controller.extend({
			initialize: function(options) {
				require(['header/controllers', 'footer/controllers'], function(HeaderController, FooterController, MenuController) {
					new HeaderController();
					new FooterController();
				});
				var pageLayout = new List.PageLayout();
				App.sourceRegion.show(pageLayout);
				
				pageLayout.showChildView('menuRegion', new App.StoreApp.Menu.DesktopView());
				this.cart = App.request('get:cart');
				this.collection = App.request("list:entities", options);
				var self = this;
				if (options.name !== 'cartridges') {
	 				require(['filter/controllers'], function(FilterController) {
						new FilterController({category: options.name, layout: pageLayout, listCollection: self.collection});
					});
	 			}
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
							'cart_id': self.cart.get('cart').id,
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