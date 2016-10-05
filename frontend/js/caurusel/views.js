define(["app",
		"tpl!templates/caurusel/caurusel.tpl",
		"tpl!templates/caurusel/photo.tpl"], function(App, cauruselTpl, photoTpl) {
	App.module("StoreApp.Caurusel", function(Caurusel, App, Backbone, Marionette, $, _) {
		Caurusel.View = Marionette.ItemView.extend({
			template: photoTpl,
			triggers: {
				'click .photo': 'photo:select'
			},
			serializeData: function() {
				var data = this.model.toJSON();
				data.id = this.model.cid;
				return data;
			}
		});
		Caurusel.CompositeView = Marionette.CompositeView.extend({
			template: cauruselTpl,
			childView: Caurusel.View,
			events: {
				'click .cursor' : 'getGroup'
			},
			initialize: function() {
				this.currentSmall = this.collection.at(0).cid;
				this.listenTo(this.collection, 'reset', this.render);
				this.on('childview:photo:select', function(childView) {
					$('#main-photo').fadeOut("fast", function() {
						this.render();
						this.currentSmall = childView.model.cid;
						$('#photo-'+this.currentSmall).toggleClass('current-photo');
					}.bind(this));
				}.bind(this));
				this.on('change:previews', function(previews) {
					$('#photo-source').fadeOut("fast", function() {
						this.collection.reset(previews);
						$('#photo-'+this.currentSmall).toggleClass('current-photo');
					}.bind(this));
				});
			},
			childViewContainer: function() {
				return "#photo-source"
			},
			onShow: function() {
				$('#photo-'+this.currentSmall).toggleClass('current-photo');
			},
			getGroup: function(event) {
				this.trigger('photo:group', event.target.id);
			},
		});
	});
});