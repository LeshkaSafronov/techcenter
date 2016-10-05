define(["app",
		"caurusel/views"], function(App) {
	App.module("StoreApp.Caurusel", function(Caurusel, App, Backbone, Marionette, $, _) {
		Caurusel.Controller = Marionette.Controller.extend({
			initialize: function(layoutView) {
				this.getView(layoutView);
			},
			getView: function(layoutView) {
				var start = 0;
				this.model = new Backbone.Model({photo_url: 'images/1.png'});
				var dataCollection = new Backbone.Collection([
					{
						photo_url: 'images/1.png'
					},
					{
						photo_url: 'images/2.png'
					},
					{
						photo_url: 'images/3.png'
					},
					{
						photo_url: 'images/1.png'
					},
					{
						photo_url: 'images/2.png'
					},
					{
						photo_url: 'images/1.png'
					},
					{
						photo_url: 'images/2.png'
					},
				]);
				this.collection = new Backbone.Collection();
				for (var i = 0; i < Config.photoPagination; i++) {
					this.collection.add(dataCollection.at(i));
				}
				this.view = new Caurusel.CompositeView({model: this.model, collection: this.collection});
				this.listenTo(this.view, 'childview:photo:select', function(childView) {
					this.view.model.set(childView.model.toJSON());
				});
				this.listenTo(this.view, 'photo:group', function(nav) {
					if (nav === 'prev') {
						if (start - Config.photoPagination >= 0) {
							var previews = [];
							start -= Config.photoPagination;
							for (var i = start; i < start+Config.photoPagination; i++) {
								previews.push(dataCollection.at(i));
							}
							this.view.trigger('change:previews', previews);
						}
					}
					if (nav === 'next') {
						if (start + Config.photoPagination < dataCollection.length) {
							var previews = [];
							start += Config.photoPagination;
							for (var i = start; i < Math.min(start+Config.photoPagination, dataCollection.length); i++) {
								previews.push(dataCollection.at(i));
							}
							this.view.trigger('change:previews', previews);
						}
					}
				});
				layoutView.showChildView('cauruselRegion', this.view);
			}
		});
	});
});