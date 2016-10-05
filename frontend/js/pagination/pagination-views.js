define(["app"], function(App) {
	App.module("StoreApp.Item.Pagination", function(Pagination, App, Backbone, Marionette, $, _) {
		Pagination.View = Marionette.ItemView.extend({
			template: '#number-template',
			tagName: 'li',
			events: {
				'click .number' : 'number',
			},
			number: function(event) {
				event.preventDefault();
				this.trigger("pagination:number");
			}
		});
		Pagination.CollectionView = Marionette.CollectionView.extend({
			childView: Pagination.View,
			tagName: 'ul',
			className: 'pagination' 
		});
	});
});