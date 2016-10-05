define(["app"], function(App) {
	App.module("StoreApp.Cookie", function(Cookie, App, Backbone, Marionette, $, _) {
		Cookie.Model = Backbone.Model.extend({
			defaults: {
				name: undefined
			}
		});
		var API = {
			getCookieUser: function() {
				var model = new Cookie.Model();
				model.set(JSON.parse(_.isUndefined($.cookie('user_name')) ? '{}' : $.cookie('user_name')));
				model.set('id', $.cookie('user_id'));
				return model;
			}
		}
		App.reqres.setHandler('get:cookieUser', function() {
			return API.getCookieUser();
		});
	});
});