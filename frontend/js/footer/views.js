define(["app",
		"tpl!templates/footer/footer.tpl"], function(App, footerTpl) {
	App.module("StoreApp.Footer", function(Footer, App, Backbone, Marionette, $, _) {
		Footer.View = Marionette.ItemView.extend({
			template: footerTpl
		});
	});
});