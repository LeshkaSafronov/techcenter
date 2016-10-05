define(["app",
		"cookie/models"], function(App) {
	App.module("StoreApp", function(StoreApp, App, Backbone, Marionette, $, _) {
		StoreApp.AppRouter = Marionette.AppRouter.extend({
			appRoutes: {
				'' : 'listPrinters',
				'printers' : 'listPrinters',
				'scanners' : 'listScanners',
				'show/:id' : 'showItem',
				'signup' : 'signUp',
				'login' : 'login',
				'users/(:id)' : 'users'
			}
		});
		var API = Marionette.Controller.extend({
			listItems: function() {
				new StoreApp.List.Controller(name);
			},
			listPrinters: function(options) {
				require(["list/controllers"], function(ListController) {
					new ListController(_.extend({name: 'printers'}, App.UrlToJSON(options)));
				});
			},
			listScanners: function() {
				new StoreApp.Item.Controller('scanners');
			},
			login: function() {
				var id = this.hasLogin();
				if (_.isUndefined(id)) {
					require(["login/controllers"], function(LoginController) {
						new LoginController();
					});
				}
				else {
					Backbone.history.navigate('users/' + id, true);
				}
			},
			showItem: function(id) {
				require(["show/controllers"], function(ShowController) {
					new ShowController(id);
				});
			},
			signUp: function() {
				require(["signup/controllers"], function(SignUpController) {
					new SignUpController();
				});
			},
			users: function(id) {
				require(["user/controllers"], function(UserController) {
					new UserController(id);
				});
			},

			hasLogin: function() {
				var cookieModel = App.request('get:cookieUser');
				if (!_.isUndefined(cookieModel.id)) {
					return cookieModel.id;
				}
			}
		});
		App.addInitializer(function() {
			var router = new StoreApp.AppRouter({controller: new API()});
			router.listenTo(App, 'route:main', function(nav) {
				Backbone.history.navigate('', true);
			});
			router.listenTo(App, 'route:menu', function(nav) {
				Backbone.history.navigate(nav, true);
			});
			router.listenTo(App, 'route:login', function(nav) {
				Backbone.history.navigate(nav, true);
			});
			router.listenTo(App, 'route:page', function(options) {
				Backbone.history.navigate(options.name + '?page=' + options.page + '&per_page=' + Config.per_page, true);
			});
			router.listenTo(App, 'show:item', function(id) {
				Backbone.history.navigate('show/' + id, true);
			});

			router.listenTo(App, 'show:user', function(id) {
				Backbone.history.navigate('users/' + id, true);
			});
			Backbone.history.start();
		});


	});
});