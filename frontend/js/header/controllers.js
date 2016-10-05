define(["app",
		"cookie/models",
		"cart/models",
		"header/views"], function(App) {
	App.module("StoreApp.Header", function(Header, App, Backbone, Marionette, $, _) {
		Header.Controller = Marionette.Controller.extend({
			initialize: function() {
				this.showHeader();
			},
			showHeader: function() {
				this.user = App.request('get:cookieUser');
				this.cart = App.request('get:cart');
				this.view = new Header.View({userModel: this.user, cartModel: this.cart});
				App.headerRegion.show(this.view);
				this.listenTo(this.view, 'search:item', function(query) {
					var data = App.request("items:entities", {query: query});
					var searchView = new App.StoreApp.Search.Popup.CollectionView({collection: data.collection});
					this.view.showChildView('searchRegion', searchView);
				});
				this.listenTo(App, 'update:cart', function() {
					if (!this.view.isDestroyed) {
						this.cart.fetch();
					}
				});
			}
		});
	});
});