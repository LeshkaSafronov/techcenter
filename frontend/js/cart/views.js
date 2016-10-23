define(["app",
		"tpl!templates/cart/cart.tpl",
		"tpl!templates/cart/item.tpl"], function(App, cartTpl, itemTpl) {
	App.module("StoreApp.Cart", function(Cart, App, Backbone, Marionette, $, _) {
		Cart.ItemView = Marionette.ItemView.extend({
			template: itemTpl,
			tagName: 'tr',
			events: {
				'click .link__item' : 'showItem',
				'click #add' : 'addItem',
				'click #remove' : 'removeItem'
			},

			showItem: function() {
				App.trigger('show:item', this.model.get('item_id'));
			},

			addItem: function() {
				this.trigger('add:item');
			},

			removeItem: function() {
				this.trigger('remove:item');
			}

		});

		Cart.View = Marionette.CompositeView.extend({
			template: cartTpl,
			
			childViewContainer: 'tbody',

			childView: Cart.ItemView,

			initialize: function() {
				this.listenTo(this.model, 'sync', this.render);
			}
		});
	});
});