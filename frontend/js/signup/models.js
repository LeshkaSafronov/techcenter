define(["app"], function(App) {
	App.module("StoreApp.SignUp", function(SignUp, App, Backbone, Marionette, $, _) {
		SignUp.Model = Backbone.Model.extend({
			defaults: {
				name: '',
				email: '',
				password: '',
				password_confirmation: ''
			},
			url: 'api/signup',
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