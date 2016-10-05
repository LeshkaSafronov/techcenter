define(["app",
		"tpl!templates/errors/error.tpl",
		"tpl!templates/errors/errors.tpl"], function(App, errorTpl, errorsTpl) {
	App.module("StoreApp.Errors", function(Errors, App, Backbone, Marionette, $, _) {

		Errors.ErrorView = Marionette.ItemView.extend({
			template: errorTpl,
			tagName: 'li'
		});

		Errors.ErrorsView = Marionette.CompositeView.extend({
			template: errorsTpl,
			childView: Errors.ErrorView,
			childViewContainer: 'ul'
		});

	});
});
