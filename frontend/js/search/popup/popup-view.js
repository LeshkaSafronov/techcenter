define(["app"], function(App) {
	App.module("StoreApp.Search.Popup", function(Popup, App, Backbone, Marionette, $, _) {
		Popup.View = Marionette.ItemView.extend({
			template: '#search-popup',
		});
		Popup.CollectionView = Marionette.CollectionView.extend({
			childView: Popup.View
		});
	});
});
