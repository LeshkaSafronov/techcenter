define(["app"], function(App) {
	App.module("StoreApp.Edit", function(Edit, App, Backbone, Marionette, $, _) {
		Edit.Model = Backbone.Model.extend({
			defaults: {
				name: '',
				description: '',
				group: '',
				avatar: '',
				price: 0,
				weight: 0,
				width: 0,
				height: 0,
				depth: 0,
				color_item: '',
				color: '',
				maxFormat: '',
				doublePrint: '',
				brand: '',
				automaticFeed: '',
				doubleScan: '',
				format: '',
				kind: ''
			},

			url: function() {
				return 'api/item/' + this.get('item_id');
			},

			parse: function(response) {
				return response.data;
			},

			sync: function(method, model, options) {
        		options = options || {};
        		options.beforeSend = function (xhr) {
		            xhr.setRequestHeader('authenticity_token', model.get('authenticity_token'));
        		};
        		return Backbone.Model.prototype.sync.apply(this, arguments);
    		}
		});
		var API = {
			getEdit: function(id) {
				var model = new Edit.Model({item_id: id});
				model.fetch();
				return model;
			}
		};

		App.reqres.setHandler('get:edit', function(id) {
			return API.getEdit(id);
		});
	});
});