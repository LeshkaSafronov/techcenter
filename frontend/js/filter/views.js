define(["app",
		"slider",
		"tpl!templates/filter/filter.tpl"], function(App, Slider, filterTpl) {
	App.module("StoreApp.Filter", function(Filter, App, Backbone, Marionette, $, _) {
		Filter.View = Marionette.ItemView.extend({
			template: filterTpl,
			onShow: function() {
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
		});
	});
});