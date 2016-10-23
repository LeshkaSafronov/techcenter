define(["app",
		"cart/models",
		"cart/views"], function(App) {
	App.module("StoreApp.Cart", function(Cart, App, Backbone, Marionette, $, _) {
		Cart.Controller = Marionette.Controller.extend({
			initialize: function() {
				this.prepare();
				this.model = App.request('get:cart');
				this.collection = App.request('get:cartCollection');
				this.view = new Cart.View({model: this.model, collection: this.collection});
				var self = this;
				this.show();
			},

			show: function() {
				App.sourceRegion.show(this.view);
				this.listenTo(this.view, 'childview:add:item', this.addItem);
				this.listenTo(this.view, 'childview:remove:item', this.removeItem);
			},

			addItem: function(childView) {
				var self = this;
				var model = new Cart.AddItem({item_id: childView.model.get('item_id')});
				var token = this.getAuthenticityToken('/api/item/' + model.get('item_id') + '/add');
				token.done(function(response) {
					authToken = App.parseToken(response);
					model.set({
						'quantity': 1,
						'cart_id': self.model.get('cart').id,
						'authenticity_token': authToken
					});
					model.save().done(function() {
						App.trigger('update:cart');
						self.model.fetch();
						self.collection.fetch();
					});
				});
			},

			removeItem: function(childView) {
				var self = this;
				var model = new Cart.RemoveItem({item_id: childView.model.get('item_id')});
				var token = this.getAuthenticityToken('/api/item/' + model.get('item_id') + '/remove');
				token.done(function(response) {
					authToken = App.parseToken(response);
					model.set({
						'authenticity_token': authToken,
						'cart_id': self.model.get('cart').id
					});
					model.save().done(function() {
						App.trigger('update:cart');
						self.model.fetch();
						self.collection.fetch();
					});
				});
			},





			getAuthenticityToken: function(url) {
				return $.get(url);
			},

			prepare: function() {
				require(['header/controllers', 'footer/controllers'], function(HeaderController, FooterController) {
					new HeaderController();
					new FooterController();
				});
			}
		});
	});
	return App.StoreApp.Cart.Controller;
});