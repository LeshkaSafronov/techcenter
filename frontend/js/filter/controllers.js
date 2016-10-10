define(["app",
		"filter/models",
		"filter/views"], function(App) {
	App.module("StoreApp.Filter", function(Filter, App, Backbone, Marionette, $, _) {
		Filter.Controller = Marionette.Controller.extend({
			initialize: function(options) {
				this.layout = options.layout;
				this.category = options.category;
				this.listCollection = options.listCollection;
				this.showFilter();
			},

			showFilter: function() {
				this.model = App.request('get:filter', this.category);
				this.modelToSave = App.request('get:filter:modeltosave', this.category);
				this.view = new Filter.View({model: this.model, modelToSave: this.modelToSave, category: this.category, listCollection: this.listCollection});
				this.listenTo(this.view, 'view:submit', this.submit);
				this.layout.showChildView('filterRegion', this.view);
			},

			submit: function() {
				console.log('THIS WILL BE AS COOKIE ', this.modelToSave.toJSON());
				var self = this;
				var token = self.getAuthenticityToken();
				token.done(function(response) {
					authToken = App.parseToken(response);
					self.modelToSave.set('authenticity_token', authToken);
					var filters = self.modelToSave.get('filters');
					filters['min'] = self.view.slider.getValue()[0];
					filters['max'] = self.view.slider.getValue()[1];
					self.modelToSave.set('filters', filters);

					//self.modelToSave.set('min', self.view.slider.getValue()[0]);
					//self.modelToSave.set('max', self.view.slider.getValue()[1]);
					self.modelToSave.save().done(function() {
						var curUrl = Backbone.history.getFragment();
						self.restartRouting();
						$(document).scrollTop(0);
						Backbone.history.navigate(curUrl, true);
					});
				});
			},
			restartRouting: function() {
				Backbone.history.stop();
				Backbone.history.start();
			},

			getAuthenticityToken: function() {
				return $.get('/api/filter');
			}
		});
	});
	return App.StoreApp.Filter.Controller;
});