define(["app",
		"filter/models",
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
				this.listenTo(this.view, 'change:group', this.changeGroup);
			},

			modelSave: function() {
				var token = this.getAuthenticityToken();
				var self = this;
				token.done(function(response) {
					authToken = App.parseToken(response);
					self.model.set('authenticity_token', authToken);
					self.model.save().done(function() {
						Backbone.history.navigate('', true);
					});
				});
			},
			changeGroup: function(previousGroup, newGroup) {
				if (!_.isUndefined(previousGroup)) {
					this.clearModel(previousGroup);
				}
				this.model.set('group', newGroup.slice(0,-1));
				this.infoModel = App.request('get:filter', newGroup);
				this.info = new New.InfoView({model: this.model, infoModel: this.infoModel, category: newGroup});
				this.view.showChildView('infoRegion', this.info);
			},

			clearModel: function(group) {
				var self = this;
				_.each(Config.attrOnBackend[group], function(attr) {
					self.model.set(attr, '');
				});
			},

			getAuthenticityToken: function() {
				return $.get('/api/new');
			}
		});
	});
	return App.StoreApp.New.Controller;
});

