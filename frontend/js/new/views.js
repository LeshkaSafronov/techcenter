define(["app",
		"tpl!templates/new/new.tpl"], function(App, newTpl) {
	App.module("StoreApp.New", function(New, App, Backbone, Marionette, $, _) {
		New.View = Marionette.ItemView.extend({
			template: newTpl,

			bindings: {
				'#name': 'name',
				'#description': 'description',
				'#price': 'price',
				'#width': {
					observe: 'width',
					onSet: 'format'
				},
				'#height': {
					observe: 'height',
					onSet: 'format'
				},
				'#depth': {
					observe: 'depth',
					onSet: 'format'
				},
			},

			triggers: {
				'click #save' : 'model:save',
			},

			events: {
				'click .category' : 'selectCategory'
			},
			
			format: function(value) {
				return +value;
			},

			initialize: function() {
				var self = this;
			},

			selectCategory: function(e) {
				this.$('#group').text(e.currentTarget.text);
				this.model.set('group', e.currentTarget.id);
			},

			onRender: function() {
				this.stickit();
			}
		});
	});
});

