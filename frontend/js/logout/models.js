define(["app"], function(App) {
	App.module("StoreApp.Logout", function(Logout, App, Backbone, Marionette, $, _) {
		Logout.Model = Backbone.Model.extend({
			url: 'api/logout',
			sync: function(method, model, options) {
        		options = options || {};
        		options.beforeSend = function (xhr) {
		            xhr.setRequestHeader('authenticity_token', (model.get('authenticity_token')));
        			xhr.setRequestHeader('_method', method);
        		};
        		return Backbone.Model.prototype.sync.apply(this, arguments);
    		}
		});
	});
});