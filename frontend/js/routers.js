define(["app",
		"cookie/models"], function(App) {
	App.module("StoreApp", function(StoreApp, App, Backbone, Marionette, $, _) {
		StoreApp.AppRouter = Marionette.AppRouter.extend({
			appRoutes: {
				'' : 'listShow',
				'printers' : 'listShow',
				'scanners' : 'listShow',
				'mfus' : 'listShow',
				'scanners' : 'listShow',
				'papers' : 'listShow',
				'shredders' : 'listShow',
				'cartridges' : 'listShow',
				'laminators' : 'listShow',
				'bookbinders' : 'listShow',
				'others' : 'listShow',
				'show/:id' : 'showItem',
				'signup' : 'signUp',
				'login' : 'login',
				'users/(:id)' : 'users',
				'new' : 'new',
				'search' : 'search',
				'edit/:id' : 'edit',
				'help' : 'help',
				'cart' : 'cart'
			}
		});
		var API = Marionette.Controller.extend({
			listShow: function(options) {
				var url = Backbone.history.getFragment();
				require(["list/controllers"], function(ListController) {
					new ListController(App.UrlToJSON(url));
				});
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
				require(["signup/controllers", "footer/controllers"], function(SignUpController) {
					new SignUpController();
				});
			},
			users: function(id) {
				require(["user/controllers", "footer/controllers"], function(UserController) {
					new UserController(id);
				});
			},

			new: function() {
				require(["new/controllers"], function(NewController) {
					new NewController();
				});
			},

			search: function() {
				var url = Backbone.history.getFragment();
				require(['search/controllers'], function(SeachController) {
					new SeachController(App.UrlToJSON(url));
				});
			},

			edit: function(id) {
				require(['edit/controllers'], function(EditController) {
					new EditController(id);
				});
			},

			help: function() {
				require(['help/controllers'], function(HelpController) {
					new HelpController();
				});
			},

			cart: function() {
				require(['cart/controllers'], function(CartController) {
					new CartController();
				});
			},
			
			hasLogin: function() {
				var cookieModel = App.request('get:cookieUser');
				if (!_.isUndefined(cookieModel.id)) {
					return cookieModel.id;
					new FooterController();
				}
			}
		});
		App.addInitializer(function() {
			var router = new StoreApp.AppRouter({controller: new API()});
			router.listenTo(App, 'route:main', function(nav) {
				Backbone.history.navigate('', true);
				$(document).scrollTop(0);
			});
			
			router.listenTo(App, 'route:menu', function(nav) {
				Backbone.history.navigate(nav, true);
				$(document).scrollTop(0);
			});
			
			router.listenTo(App, 'route:login', function(nav) {
				Backbone.history.navigate(nav, true);
				$(document).scrollTop(0);
			});

			router.listenTo(App, 'route:page', function(options) {
				Backbone.history.navigate(options.name + '?page=' + options.page + '&per_page=' + Config.per_page, true);
				$(document).scrollTop(0);
			});

			router.listenTo(App, 'route:search:page', function(options) {
				Backbone.history.navigate(options.name + '?query=' + options.query + '&page=' + options.page + '&per_page=' + Config.per_page, true);
				$(document).scrollTop(0);
			});

			router.listenTo(App, 'show:item', function(id) {
				Backbone.history.navigate('show/' + id, true);
				$(document).scrollTop(0);
			});

			router.listenTo(App, 'show:user', function(id) {
				Backbone.history.navigate('users/' + id, true);
				$(document).scrollTop(0);
			});

			router.listenTo(App, 'edit:item', function(id) {
				Backbone.history.navigate('edit/' + id, true);
				$(document).scrollTop(0);
			});
			Backbone.history.start();
		});


	});
});