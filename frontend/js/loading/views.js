define(["app", "spin"], function(App, Spinner) {
	App.module("StoreApp.Loading", function(Loading, App, Backbone, Marionette, $, _) {
		Loading.View = Marionette.ItemView.extend({
			template: false,
			className: 'loading__source',
			initialize: function() {
				this.collection.on('sync', function() {
					this.$el.fadeOut('fast', function() {
						this.trigger('view:sync');
					}.bind(this));
				}.bind(this));
			},
			onRender: function() {
				this.spinner = new Spinner().spin();
				this.$el.html(this.spinner.el);
				this.$el.fadeIn("fast");
			},
		});
	});
});