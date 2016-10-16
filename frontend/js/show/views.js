define(["app",
		"tpl!templates/show/layout.tpl",
		"tpl!templates/show/showItem.tpl",
		"tpl!templates/show/main-info.tpl",
		"tpl!templates/show/advanced-info-printers.tpl",
		"tpl!templates/show/advanced-info-mfus.tpl",
		"tpl!templates/show/advanced-info-scanners.tpl",
		"tpl!templates/show/advanced-info-papers.tpl",
		"tpl!templates/show/advanced-info-cartridges.tpl",
		"tpl!templates/show/advanced-info-laminators.tpl",
		"tpl!templates/show/advanced-info-bookbinders.tpl",
		"tpl!templates/show/advanced-info-others.tpl"], function(App, 
																	showTemplateTpl, 
																	showItemTpl, 
																	mainInfoTpl,
																	advancedInfoPrinters,
																	advancedInfoMfus,
																	advancedInfoScanners,
																	advancedInfoPapers,
																	advancedInfoCartridges,
																	advancedInfoLaminators,
																	advancedInfoBookbinders,
																	advancedInfoOthers) {
	App.module("StoreApp.Show", function(Show, App, Backbone, Marionette, $, _) {
		Show.LayoutView = Marionette.LayoutView.extend({
			template: showTemplateTpl,
			regions: {
				cauruselRegion: '#caurusel-region',
				infoRegion: '#info-region'
			}
		});
		
		Show.LayoutInfo = Marionette.LayoutView.extend({
			template: showItemTpl,
			
			events: {
				'click #add_to_cart' : 'addToCart',
				'click #destroy' : 'deleteFromBase',
				'click #edit' : 'editItem'
			},

			regions: {
				mainInfo: '#main-info',
				advancedInfo: '#advanced-info'
			},

			addToCart: function() {
				this.trigger('view:addItem', this.$('#countItem').val());
			},

			editItem: function() {
				this.trigger('item:edit', this.model.id);
			},

			deleteFromBase: function() {
				this.trigger('item:destroy', this.model.id);
			}
		});

		Show.MainInfo = Marionette.ItemView.extend({
			template: mainInfoTpl
		});

		Show.AdvancedInfo = Marionette.ItemView.extend({
			
			dataTeplate: {
				printer: advancedInfoPrinters,
				mfu: advancedInfoMfus,
				scanner: advancedInfoScanners,
				paper: advancedInfoPapers,
				cartridge: advancedInfoCartridges,
				laminator: advancedInfoLaminators,
				bookbinder: advancedInfoBookbinders,
				other: advancedInfoOthers
			},
			
			getTemplate: function() {
				return this.dataTeplate[this.model.get('group')];
			}
		});
	});
});
