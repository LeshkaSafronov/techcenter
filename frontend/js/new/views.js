define(["app",
		"tpl!templates/new/new.tpl",
		"tpl!templates/new/info-printers.tpl",
		"tpl!templates/new/info-mfus.tpl",
		"tpl!templates/new/info-scanners.tpl",
		"tpl!templates/new/info-papers.tpl",
		"tpl!templates/new/info-cartridges.tpl",
		"tpl!templates/new/info-laminators.tpl",
		"tpl!templates/new/info-bookbinders.tpl",
		"tpl!templates/new/info-others.tpl"], function(App, 
														   newTpl,
														   infoPrintersTpl,
														   infoMfusTpl,
														   infoScannersTpl,
														   infoPapersTpl,
														   infoCartridgesTpl,
														   infoLaminatorsTpl,
														   infoBookbindersTpl,
														   infoOthersTpl) {
	App.module("StoreApp.New", function(New, App, Backbone, Marionette, $, _) {
		New.View = Marionette.LayoutView.extend({
			template: newTpl,
			
			regions: {
				infoRegion: '#info-region',
			},
			
			bindings: {
				'#name': 'name',
				'#description': 'description',
				'#price': 'price',
				'#width': {
					observe: 'width',
					onSet: 'format'
				},
				'#height': {
					observe: 'height',
					onSet: 'format'
				},
				'#depth': {
					observe: 'depth',
					onSet: 'format'
				},
			},

			triggers: {
				'click #save' : 'model:save',
			},

			events: {
				'click .category' : 'selectCategory'
			},
			
			format: function(value) {
				return +value;
			},

			initialize: function() {
				var self = this;
			},

			selectCategory: function(e) {
				this.$('#group').text(e.currentTarget.text);
				this.trigger('change:group', e.currentTarget.id);
			},

			onRender: function() {
				this.stickit();
			}
		});

		New.InfoView = Marionette.LayoutView.extend({
			dataTeplate: {
				printers: infoPrintersTpl,
				mfus: infoMfusTpl,
				scanners: infoScannersTpl,
				papers: infoPapersTpl,
				cartridges: infoCartridgesTpl,
				laminators: infoLaminatorsTpl,
				bookbinders: infoBookbindersTpl,
				others: infoOthersTpl
			},

			getTemplate: function() {
				return this.dataTeplate[this.options.category];
			},

			initialize: function(options) {
				this.options = options;
			},

			serializeData: function() {
				var data = this.model.get('property');
				return data;
			}
		});
	});
});