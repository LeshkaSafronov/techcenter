define(["app",
		"cookie/models",
		"cart/models",
		"header/views",
		"menu/views"], function(App) {
	App.module("StoreApp.Header", function(Header, App, Backbone, Marionette, $, _) {
		Header.Controller = Marionette.Controller.extend({
			initialize: function() {
				this.showHeader();
				this.isShowMenu = 0;
			},
			showHeader: function() {
				this.user = App.request('get:cookieUser');
				this.cart = App.request('get:cart');
				this.layout = new Header.Layout();
				App.headerRegion.show(this.layout);
				this.view = new Header.View({userModel: this.user, cartModel: this.cart});
				this.menuMobileView = new App.StoreApp.Menu.MobileView({userModel: this.user, cartModel: this.cart});

				this.layout.showChildView('headerRegion', this.view);
				this.layout.showChildView('menuRegion', this.menuMobileView);

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

				this.listenTo(this.view, 'show:navMobile', function() {
					this.isShowMenu ? this.menuMobileView.$el.hide() : this.menuMobileView.$el.show();
					this.isShowMenu ^= 1;
				});
			},

		});
	});
	return App.StoreApp.Header.Controller;
});