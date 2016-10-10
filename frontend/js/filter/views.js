define(["app",
		"slider",
		"tpl!templates/filter/filter-printers.tpl",
		"tpl!templates/filter/filter-mfus.tpl",
		"tpl!templates/filter/filter-scanners.tpl",
		"tpl!templates/filter/filter-papers.tpl",
		"tpl!templates/filter/filter-cartridges.tpl",
		"tpl!templates/filter/filter-laminators.tpl",
		"tpl!templates/filter/filter-bookbinders.tpl",
		"tpl!templates/filter/filter-others.tpl"], function(App, 
													 Slider, 
													 filterPrintersTpl, 
													 filterMfusTpl, 
													 filterScannersTpl,
													 filterPapersTpl,
													 filterCartridges,
													 filterLaminatorsTpl,
													 filterBookbinderTpl,
													 filterOthersTpl) {
	App.module("StoreApp.Filter", function(Filter, App, Backbone, Marionette, $, _) {
		Filter.View = Marionette.ItemView.extend({
			dataTeplate: {
				printers: filterPrintersTpl,
				mfus: filterMfusTpl,
				scanners: filterScannersTpl,
				papers: filterPapersTpl,
				cartridges: filterCartridges,
				laminators: filterLaminatorsTpl,
				bookbinders: filterBookbinderTpl,
				others: filterOthersTpl
			},
			
			getTemplate: function() {
				return this.dataTeplate[this.options.category];
			},

			events: {
				'click .color' : 'addFilter',
				'click .maxFormat' : 'addFilter',
				'click .doublePrint' : 'addFilter',
				'click .brand' : 'addFilter',
				'click .automaticFeed' : 'addFilter',
				'click .doubleScan' : 'addFilter',
				'click .format' : 'addFilter',
				'click .kind' : 'addFilter',
			},

			triggers: {
				'click #submit': 'view:submit'
			},

			initialize: function(options) {
				this.options = options;
				this.modelToSave = options.modelToSave;
				var self = this;
				this.options.listCollection.on('sync', function() {
					self.render();
					self.renderSlide();
					self.prepareCheckboxes();
				});
			},

			serializeData: function() {
				var data = this.model.get('property');
				data.min = !_.isUndefined(this.options.listCollection.minMax) ? this.options.listCollection.minMax.min : 0;
				data.max = !_.isUndefined(this.options.listCollection.minMax) ? this.options.listCollection.minMax.max : 0;
				return data;
			},

			renderSlide: function() {
				var self = this;
				var min = !_.isUndefined(this.options.listCollection.minMax) ? this.options.listCollection.minMax.min : 0;
				var max = !_.isUndefined(this.options.listCollection.minMax) ? this.options.listCollection.minMax.max : 0;
				if (this.options.category !== 'cartridges') {
					this.slider = new Slider('#ex2', {
						tooltip: 'hide',
						value: [min, max]
					});
					this.slider.on('slide', function() {
						self.$('#left-range').val(self.slider.getValue()[0]);
						self.$('#right-range').val(self.slider.getValue()[1]);
					});
					this.slider.on('slideStart', function() {
						self.$('#left-range').val(self.slider.getValue()[0]);
						self.$('#right-range').val(self.slider.getValue()[1]);
					});
				}
				if ($.cookie('min') && $.cookie('max')) {
					this.slider.setValue([+$.cookie('min'), +$.cookie('max')]);
					self.$('#left-range').val(+$.cookie('min'));
					self.$('#right-range').val(+$.cookie('max'));
				}
			},

			addFilter: function(e) {
				var text = e.currentTarget.labels[0].textContent;
				var className = e.currentTarget.className;
				var checked = e.currentTarget.checked;
				var filters = this.modelToSave.get('filters');
				if (checked) {
					filters[className].push(text);
				}
				else {
					var id = filters[className].indexOf(text);
					filters[className].splice(id,1);
				}
				this.modelToSave.set('filters', filters);
			},

			prepareCheckboxes: function() {
				var self = this;
				var filters = this.modelToSave.get('filters');
				_.each(Config.filters, function(filter) {
					for (var i = 0; i < self.$('.' + filter).length; i++) {
						var checkbox = self.$('.' + filter).eq(i);
						var text = checkbox[0].labels[0].textContent;
						if (!_.isUndefined($.cookie(filter))) {
							var arr = $.cookie(filter).split('&');
							if (_.contains(arr, text)) {
								checkbox.prop('checked', true);
								if (!_.contains(filters[filter], text)) {
									filters[filter].push(text);	
								}
								
							}

						}
					}
				});
				this.modelToSave.set('filters', filters);
			},

			onShow: function() {
				this.renderSlide();
				this.prepareCheckboxes();
			}
		});
	});
});