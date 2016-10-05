define(["app"], function(App) {
	App.module("StoreApp.Login", function(Login, App, Backbone, Marionette, $, _) {
		Login.Model = Backbone.Model.extend({
			defaults: {
				email: '',
				password: '',
				remember_me: false
			},
			url: 'api/login',
			sync: function(method, model, options) {
        		options = options || {};
        		options.beforeSend = function (xhr) {
		            xhr.setRequestHeader('authenticity_token', (model.get('authenticity_token')));
        		};
        		return Backbone.Model.prototype.sync.apply(this, arguments);
    		}
		});
	});
});