define(["app",
		"header/controllers",
		"footer/controllers",
		"login/models",
		"login/views"], function(App) {
	App.module("StoreApp.Login", function(Login, App, Backbone, Marionette, $, _) {
		Login.Controller = Marionette.Controller.extend({
			initialize: function() {
				new App.StoreApp.Header.Controller();
				new App.StoreApp.Footer.Controller();
				var layout = new Login.LayoutView();
				App.sourceRegion.show(layout);

				this.model = new Login.Model();
				this.viewForm = new Login.ViewForm({model: this.model});
				layout.showChildView('formRegion', this.viewForm);
				var self = this;
				var token = this.getAuthenticityToken();
				this.listenTo(this.viewForm, 'login:user', function() {
					token.done(function(response) {
						var r = response.lastIndexOf('"') - 1;
						var l = response.lastIndexOf('"', r-1) + 1;
						self.model.set('authenticity_token', response.substr(l, r-l+1));
						var promise = self.model.save();
						promise.done(function() {
							App.trigger("show:user", self.model.id);
						});
						promise.fail(function(response) {
							require(['errors/controllers'], function(ErrorsController) {
								new ErrorsController({layout: layout, response: response});
							});
						});
					});
				});
			},
			getAuthenticityToken: function() {
				return $.get('/api/login');
			}
		});
	});
	return App.StoreApp.Login.Controller;
});