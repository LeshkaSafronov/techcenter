define(["app",
		"header/controllers",
		"footer/controllers",
		"caurusel/controllers",
		"show/models",
		"cart/models",
		"show/views"], function(App) {
	App.module("StoreApp.Show", function(Show, App, Backbone, Marionette, $, _) {
		Show.Controller = Marionette.Controller.extend({
			initialize: function(id) {
				this.model = App.request('get:item', id);
				this.destroyModel = App.request('get:destroy', id);
				this.addItem = App.request('get:addItem', id);
				this.layoutInfo = new Show.LayoutInfo({model: this.model});
				this.layout = new Show.LayoutView({model: this.model});
				this.mainInfo = new Show.MainInfo({model: this.model});
				this.advancedInfo = new Show.AdvancedInfo({model: this.model});
				var self = this;
				this.model.on('sync', function() {
					App.sourceRegion.show(self.layout);
					new App.StoreApp.Header.Controller();
					new App.StoreApp.Footer.Controller();
					new App.StoreApp.Caurusel.Controller(self.layout);
					self.showItem(id);
				});
			},

			showItem: function(id) {
				this.layout.showChildView('infoRegion', this.layoutInfo);
				this.layoutInfo.showChildView('mainInfo', this.mainInfo);
				this.layoutInfo.showChildView('advancedInfo', this.advancedInfo);
				this.listenTo(this.layoutInfo, 'view:addItem', this.addToCart);
				this.listenTo(this.layoutInfo, 'item:destroy', this.deleteFromBase);
			},

			addToCart: function(quantity) {
				var self = this;
				var token = self.getAuthenticityToken('/api/show/' + this.id);
				token.done(function(response) {
					authToken = App.parseToken(response);
					self.addItem.set({
						'quantity': quantity,
						'authenticity_token': authToken
					});
					self.addItem.save().done(function() {
						App.trigger('update:cart');
					});

				});
			},

			deleteFromBase: function(id) {
				var question = 'Вы действительно хотите удалить товар?';
				if (confirm(question)) {
					var self = this;
					var token = self.getAuthenticityToken('api/destroy/item/' + this.id);
					token.done(function(response) {
						authToken = App.parseToken(response);
						self.destroyModel.set('authenticity_token', authToken);
						self.destroyModel.save().done(function(response) {
							App.trigger('route:main');
						});
					});
				}
			},
			
			getAuthenticityToken: function(url) {
				return $.get(url);
			}
		});
	});
	return App.StoreApp.Show.Controller;
});
