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
			getTemplate: function() {
				if (this.options.category === 'printers') {
					return filterPrintersTpl;
				}

				if (this.options.category === 'mfus') {
					return filterMfusTpl;
				}

				if (this.options.category === 'scanners') {
					return filterScannersTpl;
				}

				if (this.options.category === 'papers') {
					return filterPapersTpl;
				}

				if (this.options.category === 'cartridges') {
					return filterCartridges;
				}

				if (this.options.category === 'laminators') {
					return filterLaminatorsTpl;
				}

				if (this.options.category === 'bookbinders') {
					return filterBookbinderTpl;
				}

				if (this.options.category === 'others') {
					return filterOthersTpl;
				}

			},

			initialize: function(options) {
				this.options = options;
			},

			serializeData: function() {
				var data = this.model.get('property');
				return data;
			},

			onShow: function() {
				if (this.options.category !== 'cartridges') {
					var slider = new Slider('#ex2', {
						tooltip: 'hide',
						value: [10, 1000]
					});
					slider.on('slide', function() {
						$('#left-range').val(slider.getValue()[0]);
						$('#right-range').val(slider.getValue()[1]);
					});
					slider.on('slideStart', function() {
						$('#left-range').val(slider.getValue()[0]);
						$('#right-range').val(slider.getValue()[1]);
					});
				}
			}
		});
	});
});