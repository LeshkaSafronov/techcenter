define(["app",
		"menu/views"], function(App) {
	App.module("StoreApp.Menu", function(Menu, App, Backbone, Marionette, $, _) {
		Menu.Controller = Marionette.Controller.extend({
			initialize: function() {
				//this.layout = options.layout;
				this.desktopView = new Menu.DesktopView();
				this.mobileView = new Menu.MobileView();
				this.show();
			},

			show: function() {
				this.listenTo(App, 'render:menuDesktop', this.renderDesktop);
				this.listenTo(App, 'render:menuMobile', this.renderMobile);
				//this.layout.showChildView('menuRegion', this.desktopView);
			},

			renderDesktop: function(layout, region) {
				layout.showChildView(region, this.desktopView);
			},

			renderMobile: function(layout, region) {
				layout.showChildView(region, this.mobileView);
			}

		});
	});
	return App.StoreApp.Menu.Controller;
});
