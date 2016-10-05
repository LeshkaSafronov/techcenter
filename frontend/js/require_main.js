requirejs.config({
	baseUrl: "js",
	paths: {
		backbone: "lib/backbone-min",
		marionette: "lib/backbone.marionette.min",
		jquery: "lib/jquery-3.1.1.min",
		jqueryUi: "lib/jquery-ui.min",
		spin: "lib/spin.min",
		underscore: "lib/underscore-min",
		bootstrap: "lib/bootstrap.min",
		slider: "lib/bootstrap-slider.min",
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
	App.start();
});