define(["app",
		"header/controllers",
		"footer/controllers",
		"new/models",
		"new/views"], function(App) {
	App.module("StoreApp.New", function(New, App, Backbone, Marionette, $, _) {
		New.Controller = Marionette.Controller.extend({
			initialize: function() {
				this.prepare();
				this.show();
			},

			prepare: function() {
				new App.StoreApp.Header.Controller();
				new App.StoreApp.Footer.Controller();
			},

			show: function() {
				this.model = new New.Model();
				this.view = new New.View({model: this.model});
				this.listenTo(this.view, 'model:save', this.modelSave);
				App.sourceRegion.show(this.view);
			},

			modelSave: function() {
				var token = this.getAuthenticityToken();
				var self = this;
				token.done(function(response) {
					authToken = App.parseToken(response);
					self.model.set('authenticity_token', authToken);
					self.model.save();
				});
			},

			getAuthenticityToken: function() {
				return $.get('/api/new');
			}
		});
	});
	return App.StoreApp.New.Controller;
});

