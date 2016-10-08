define(["app"], function(App) {
	App.module("StoreApp.New", function(New, App, Backbone, Marionette, $, _) {
		New.Model = Backbone.Model.extend({
			defaults: {
				name: '',
				description: '',
				group: '',
				avatar: '',
				price: 0,
				width: 0,
				height: 0,
				depth: 0
			},

			url: 'api/new',

			sync: function(method, model, options) {
        		options = options || {};
        		options.beforeSend = function (xhr) {
		            xhr.setRequestHeader('authenticity_token', model.get('authenticity_token'));
        		};
        		return Backbone.Model.prototype.sync.apply(this, arguments);
    		}
		});
	});
});