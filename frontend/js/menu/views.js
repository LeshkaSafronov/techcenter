define(["app", "tpl!templates/menu/menu.tpl"], function(App, menuTpl) {
	App.module("StoreApp.Menu", function(Menu, App, Backbone, Marionette, $, _) {
		Menu.View = Marionette.ItemView.extend({
			template: menuTpl,
			events: {
				'click .nav' : 'nav',
			},
			columns: ['printers', 'scanners', 'paper', 'cartridges', 'laminators', 'bookbinders', 'others'],
			nav: function(event) {
				App.trigger("route:menu", event.target.id);
			},
			serializeData: function() {
				var data = {};
				data.columns = this.columns;
				return data;
			}
		});
	});
	return App.StoreApp.Menu.View;
});
