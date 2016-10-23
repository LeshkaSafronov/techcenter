define(["app"], function(App) {
	App.module("StoreApp.Cart", function(Cart, App, Backbone, Marionette, $, _) {
		Cart.Model = Backbone.Model.extend({
			defaults: {
				cart: {},
				items: {},
				count: {},
				totalPrice: 0
			},

			url: function() {
				return 'api/cart/' + this.id;
			},

			parse: function(response) {
				count = response.count;
				items = response.items;
				var totalPrice = 0;
				_.each(items, function(item) {
					totalPrice += item.price * count[item.item_id];
				});
				response.totalPrice = totalPrice;
				return response;
			}
		});

		Cart.AddItem = Backbone.Model.extend({
			url: function() {
				return 'api/item/' + this.get('item_id') + '/add';
			},
			sync: function(method, model, options) {
        		options = options || {};
        		options.beforeSend = function (xhr) {
		            xhr.setRequestHeader('authenticity_token', (model.get('authenticity_token')));
        		};
        		return Backbone.Model.prototype.sync.apply(this, arguments);
    		}
		});

		Cart.RemoveItem = Backbone.Model.extend({
			url: function() {
				return 'api/item/' + this.get('item_id') + '/remove';
			},
			sync: function(method, model, options) {
        		options = options || {};
        		options.beforeSend = function (xhr) {
		            xhr.setRequestHeader('authenticity_token', (model.get('authenticity_token')));
        		};
        		return Backbone.Model.prototype.sync.apply(this, arguments);
    		}
		});


		Cart.Collection = Backbone.Collection.extend({
			
			initialize: function(models, options) {
				this.options = options;
			},

			url: function() {
				return 'api/cart/' + this.options.cartId;
			},

			parse: function(response) {
				count = response.count;
				items = response.items;
				_.each(items, function(item) {
					_.extend(item, {count: count[item.item_id], totalPrice: item.price * count[item.item_id]});
				});
				return response.items;
			}
		});

		var API = {
			getCart: function() {
				var promise = App.getCart();
				var model = new Cart.Model();
				var self = this;
				promise.done(function() {
					model.set('id', self.getCartId());
					model.fetch();
				});
				return model;
			},

			getCartCollection: function() {
				var collection = new Cart.Collection([], {cartId: this.getCartId()});
				collection.fetch();
				return collection;

			},

			getCartId: function() {
				return $.cookie('log_cart') ? +$.cookie('log_cart') : +$.cookie('stgr_cart');
			}
		};

		App.reqres.setHandler('get:cart', function() {
			return API.getCart();
		});

		App.reqres.setHandler('get:cartCollection', function() {
			return API.getCartCollection();
		});
	});
});