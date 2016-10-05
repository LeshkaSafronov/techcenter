define(["app",
		"tpl!templates/login/login-layout.tpl",
		"tpl!templates/login/login.tpl",
		"tpl!templates/errors/error.tpl",
		"tpl!templates/errors/errors.tpl"], function(App, loginLayoutTpl, loginTpl, errorTpl, errorsTpl) {
	App.module("StoreApp.Login", function(Login, App, Backbone, Marionette, $, _) {
		Login.LayoutView = Marionette.LayoutView.extend({
			template: loginLayoutTpl,
			regions: {
				errorsRegion: '#errors-region',
				formRegion: '#form-region'
			}
		});


		Login.ViewForm = Marionette.ItemView.extend({
			template: loginTpl,

			events: {
				'click #submit' : 'submit',
				'click #signup-link' : 'signup'
			},

			bindings: {
				'#email': 'email',
				'#password': 'password',
				'#remember_me': 'remember_me'
			},
			
			submit: function(e) {
				e.preventDefault();
				this.trigger('login:user');
			},

			signup: function(e) {
				e.preventDefault();
				Backbone.history.navigate('signup', true);
			},

			onRender: function() {
				this.stickit();
			}
		});
	});
});
