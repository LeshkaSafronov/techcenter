define(["app",
		"tpl!templates/edit/edit.tpl",
		"tpl!templates/edit/info-printers.tpl",
		"tpl!templates/edit/info-mfus.tpl",
		"tpl!templates/edit/info-scanners.tpl",
		"tpl!templates/edit/info-papers.tpl",
		"tpl!templates/edit/info-cartridges.tpl",
		"tpl!templates/edit/info-laminators.tpl",
		"tpl!templates/edit/info-bookbinders.tpl",
		"tpl!templates/edit/info-others.tpl"], function(App, 
														   editTpl,
														   infoPrintersTpl,
														   infoMfusTpl,
														   infoScannersTpl,
														   infoPapersTpl,
														   infoCartridgesTpl,
														   infoLaminatorsTpl,
														   infoBookbindersTpl,
														   infoOthersTpl) {
	App.module("StoreApp.Edit", function(Edit, App, Backbone, Marionette, $, _) {
		Edit.View = Marionette.LayoutView.extend({
			template: editTpl,
			
			regions: {
				infoRegion: '#info-region',
			},

			checkboxes: ['color', 'maxFormat', 'doublePrint', 'brand', 'automaticFeed', 'doubleScan', 'format', 'kind'],
			
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
				this.listenTo(this.model, 'sync', this.prepare);
			},

			prepare: function() {
				this.currentCategory = this.model.get('group') + 's';
				this.trigger('change:group', undefined, this.currentCategory);
				this.$('#group').text(this.$('#' + this.currentCategory).text());
				this.$('#save').prop("disabled", false);
				this.setCheckboxes();
			},

			setCheckboxes: function() {
				var self = this;
				_.each(this.checkboxes, function(type) {
					if (self.model.get(type) !== null) {
						var len = self.$('.' + type).length;
						for (var i = 0; i < len; i++) {
							var checkbox = self.$('.' + type).eq(i);
							var text = checkbox[0].labels[0].textContent;
							if (text === self.model.get(type)) {
								checkbox.prop('checked', true); // make checkbox active 
							}
						}
					}
				});
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

		Edit.InfoView = Marionette.LayoutView.extend({
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