define(["app",
		"tpl!templates/show/layout.tpl",
		"tpl!templates/show/showItem.tpl"], function(App, showTemplateTpl, showItemTpl) {
	App.module("StoreApp.Show", function(Show, App, Backbone, Marionette, $, _) {
		Show.LayoutView = Marionette.LayoutView.extend({
			template: showTemplateTpl,
			regions: {
				cauruselRegion: '#caurusel-region',
				infoRegion: '#info-region'
			}
		});
		Show.View = Marionette.ItemView.extend({
			template: showItemTpl,
			
			events: {
				'click #add_to_cart' : 'addToCart'
			},

			addToCart: function() {
				this.trigger('view:addItem', this.$('#countItem').val());
			}
		})
	});
});
