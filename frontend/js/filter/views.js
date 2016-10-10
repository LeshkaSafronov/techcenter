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
				console.log(this.modelToSave.toJSON());
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
				//var min = +$.cookie('min');
				//var max = +$.cookie('max');
				if (this.options.category !== 'cartridges') {
					this.slider = new Slider('#ex2', {
						tooltip: 'hide',
						value: [min, max]
						//value: [$.cookie('min'), $.cookie('max')]
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
				console.log(text, className, checked);
				var filters = this.modelToSave.get('filters');
				//var filter = this.modelToSave.get('filters')[className];
				if (checked) {
					filters[className].push(text);
				}
				else {
					var id = filters[className].indexOf(text);
					filters[className].splice(id,1);
				}
				this.modelToSave.set('filters', filters);
				console.log(this.modelToSave.toJSON());


			},

			prepareCheckboxes: function() {
				//console.log(Config.filters);
				var self = this;
				var filters = this.modelToSave.get('filters');
				_.each(Config.filters, function(filter) {
					//console.log(filter);
					//console.log($.cookie(filter));
					for (var i = 0; i < self.$('.' + filter).length; i++) {
						var checkbox = self.$('.' + filter).eq(i);
						var text = checkbox[0].labels[0].textContent;
						//console.log(text);
						console.log($.cookie(filter));
						if (!_.isUndefined($.cookie(filter))) {
							var arr = $.cookie(filter).split('&');
							if (_.contains(arr, text)) {
								checkbox.prop('checked', true);
								filters[filter].push(text);
							}

						}
					}

				});
				this.modelToSave.set('filters', filters);
				console.log('THIS MODEL TO SAVE ', this.modelToSave.toJSON());
			},

			onShow: function() {
				this.renderSlide();
				this.prepareCheckboxes();
			}
		});
	});
});