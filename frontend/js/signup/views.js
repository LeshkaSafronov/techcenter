define(["app",
		"tpl!templates/signup/signup-layout.tpl",
		"tpl!templates/signup/signup.tpl",
		"tpl!templates/errors/error.tpl",
		"tpl!templates/errors/errors.tpl"], function(App, signLayoutTpl, signUpTpl, errorTpl, errorsTpl) {
	App.module("StoreApp.SignUp", function(SignUp, App, Backbone, Marionette, $, _) {
		SignUp.LayoutView = Marionette.LayoutView.extend({
			template: signLayoutTpl,
			regions: {
				errorsRegion: '#errors-region',
				formRegion: '#form-region'
			}
		});


		SignUp.ViewForm = Marionette.ItemView.extend({
			template: signUpTpl,

			events: {
				'click #submit' : 'test'
			},

			bindings: {
				'#name': 'name',
				'#email': 'email',
				'#password': 'password',
				'#password-confirmation': 'password_confirmation'
			},

			test: function(e) {
				e.preventDefault();
				this.trigger('create:user');
			},

			onRender: function() {
				this.stickit();
			}
		});
	});
});
