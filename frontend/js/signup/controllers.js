define(["app",
		"header/controllers",
		"footer/controllers",
		"signup/models",
		"signup/views"], function(App) {
	App.module("StoreApp.SignUp", function(SignUp, App, Backbone, Marionette, $, _) {
		SignUp.Controller = Marionette.Controller.extend({
			initialize: function() {
				new App.StoreApp.Header.Controller();
				new App.StoreApp.Footer.Controller();
				var layout = new SignUp.LayoutView();
				App.sourceRegion.show(layout);

				this.model = new SignUp.Model();
				this.viewForm = new SignUp.ViewForm({model: this.model});
				layout.showChildView('formRegion', this.viewForm);

				var self = this;
				var token = this.getAuthenticityToken();
				this.listenTo(this.viewForm, 'create:user', function() {
					token.done(function(response) {
						var r = response.lastIndexOf('"') - 1;
						var l = response.lastIndexOf('"', r-1) + 1;
						self.model.set('authenticity_token', response.substr(l, r-l+1));
						self.model.save(null, {
							
							success: function() {
								Backbone.history.navigate('', true);
							},

							error: function(model, response) {
								require(['errors/controllers'], function(ErrorsController) {
									new ErrorsController({layout: layout, response: response});
								});
							}
						});
					});
				});
			},
			getAuthenticityToken: function() {
				return $.get('/api/signup');
			}
		});
	});
	return App.StoreApp.SignUp.Controller;
});