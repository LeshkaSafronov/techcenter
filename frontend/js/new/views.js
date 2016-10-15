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
				'#color_item': 'color_item',
				'#weight': {
					observe: 'weight',
					onSet: 'format'
				},
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
				this.currentCategory = e.currentTarget.id;
				if (this.currentCategory !== this.previousCategory) {
					this.$('#group').text(e.currentTarget.text);
					this.$('#save').prop("disabled", false);
					this.trigger('change:group', this.previousCategory, this.currentCategory);
					this.previousCategory = this.currentCategory
				}
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

			events: {
				'change .color' : 'setValue',
				'change .maxFormat' : 'setValue',
				'change .doublePrint' : 'setValue',
				'change .brand' : 'setValue',
				'change .automaticFeed' : 'setValue',
				'change .doubleScan' : 'setValue',
				'change .format' : 'setValue',
				'change .kind' : 'setValue'
			},

			getTemplate: function() {
				return this.dataTeplate[this.options.category];
			},

			initialize: function(options) {
				this.options = options;
				this.infoModel = options.infoModel;
			},

			setValue: function(e) {
				var curId = e.currentTarget.id;
				var len = this.$('.' + e.currentTarget.className).length;
				// make all checkbox unchecked
				for (var i = 0; i < len; i++) {
					var checkbox = this.$('.' + e.currentTarget.className).eq(i);
					if (checkbox.attr('id') !== curId) {
						checkbox.prop('checked', false);
					}
				}
				var className = e.currentTarget.className;
				var text = e.currentTarget.labels[0].textContent;
				if (e.currentTarget.checked) {
					this.model.set(className, text);
				}
				else {
					this.model.set(className, '');
				}
			},

			serializeData: function() {
				var data = this.infoModel.get('property');
				return data;
			}
		});
	});
});