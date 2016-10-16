define(["app",
		"filter/models",
		"header/controllers",
		"footer/controllers",
		"edit/models",
		"edit/views"], function(App) {
	App.module("StoreApp.Edit", function(Edit, App, Backbone, Marionette, $, _) {
		Edit.Controller = Marionette.Controller.extend({
			initialize: function(id) {
				this.prepare();
				this.show(id);
			},

			prepare: function() {
				new App.StoreApp.Header.Controller();
				new App.StoreApp.Footer.Controller();
			},

			show: function(id) {
				this.model = App.request('get:edit', id);
				this.view = new Edit.View({model: this.model});
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
						Backbone.history.navigate('show/' + self.model.id, true);
					});
				});
			},
			changeGroup: function(previousGroup, newGroup) {
				if (!_.isUndefined(previousGroup)) {
					this.clearModel(previousGroup);
				}
				this.model.set('group', newGroup.slice(0,-1));
				this.infoModel = App.request('get:filter', newGroup);
				this.info = new Edit.InfoView({model: this.model, infoModel: this.infoModel, category: newGroup});
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
	return App.StoreApp.Edit.Controller;
});

