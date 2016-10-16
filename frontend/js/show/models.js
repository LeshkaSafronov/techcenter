define(["app"], function(App) {
	App.module("StoreApp.Show", function(Show, App, Backbone, Marionette, $, _) {
		Show.Model = Backbone.Model.extend({
			url: function() {
				return 'api/item/' + this.id;
			},
			parse: function(response) {
				response.data.avatar = response.avatar;
				return response.data;
			}
		});

		Show.DestroyModel = Backbone.Model.extend({
			
			url: function() {
				return 'api/destroy/item/' + this.get('item_id');
			},

			sync: function(method, model, options) {
        		options = options || {};
        		options.beforeSend = function (xhr) {
		            xhr.setRequestHeader('authenticity_token', (model.get('authenticity_token')));
        		};
        		return Backbone.Model.prototype.sync.apply(this, arguments);
    		}
		});

		Show.AddItem = Backbone.Model.extend({
			url: function() {
				return 'api/item/' + this.get('item_id') + '/add';
			},
			sync: function(method, model, options) {
        		options = options || {};
        		options.beforeSend = function (xhr) {
		            xhr.setRequestHeader('authenticity_token', (model.get('authenticity_token')));
        		};
        		return Backbone.Model.prototype.sync.apply(this, arguments);
    		}
		});
		var API = {
			getItem: function(id) {
				var model = new Show.Model({id: id});
				model.fetch();
				return model;
			},
			getAddItem: function(id) {
				var model = new Show.AddItem({item_id: id});
				return model;
			},

			getDestroy: function(id) {
				var model = new Show.DestroyModel({item_id: id});
				return model;
			}
		}

		App.reqres.setHandler('get:item', function(id) {
			return API.getItem(id);
		});
		
		App.reqres.setHandler('get:addItem', function(id) {
			return API.getAddItem(id);
		});

		App.reqres.setHandler('get:destroy', function(id) {
			return API.getDestroy(id);
		})
	});
});