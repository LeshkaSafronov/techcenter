requirejs.config({
	baseUrl: "js",
	paths: {
		backbone: "lib/backbone",
		marionette: "lib/backbone.marionette",
		jquery: "lib/jquery-3.0.0",
		jqueryUi: "lib/jquery-ui",
		spin: "lib/spin",
		underscore: "lib/underscore",
		bootstrap: "lib/bootstrap",
		slider: "lib/bootstrap-slider",
		tpl: "lib/underscore-tpl",
		text: "lib/text",
		stickit: "lib/backbone.stickit",
		jscookie: "lib/jquery.cookie"
	},
	shim: {
		bootstrap: {
			deps: ["jquery"]
		},
		backbone: {
			deps: ["jquery", "underscore"]
		},
		marionette: {
			deps: ["backbone", "stickit", "jscookie"]
		}
	}
});
require(["app", "jscookie", "config", "routers"], function(App) {
	$.ajax('api/home').done(function() {
		App.start();
	});
});