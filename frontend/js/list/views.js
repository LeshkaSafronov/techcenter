define(["app",
		"tpl!templates/list/list.tpl",
		"tpl!templates/list/item.tpl",
		"tpl!templates/list/items-composite.tpl",
		"tpl!templates/list/items-layout.tpl"], function(App, listTpl, itemTpl, itemCompositeTpl, itemLayoutTpl) {
	App.module("StoreApp.List", function(List, App, Backbone, Marionette, $, _) {
		List.LayoutView = Marionette.LayoutView.extend({
			template: listTpl,
			regions: {
				itemsRegion: '#items-region',
				paginationRegion: '#pagination-region'
			}
		});
		List.View = Marionette.ItemView.extend({
			template: itemTpl,
			events: {
				'click #show' : 'show',
				'click .item' : 'show',
				'click #cart' : 'cart',
			},
			show: function() {
				App.trigger('show:item', this.model.id);
			},
			cart: function() {
				this.trigger('view:addItem', 1);
			}
		});
		List.CompositeView = Marionette.CompositeView.extend({
			template: itemCompositeTpl,
			
			id: 'list-photo',

			childView: List.View,
			
			events: {
				'click .number' : 'clickPagination' 
			},
			childViewContainer: function() {
				return '#photos'
			},

			initialize: function() {
				this.listenTo(this.collection, 'sync', function() {
					this._buildPagination(this._startPagination(this.collection.options.page));
				});
			},

			_startPagination: function(numberPage) {
				return Config.pagination.length*(parseInt((numberPage-1)/Config.pagination.length))+1;
			},

			_getPaginationCount: function() {
				return parseInt(this.collection.count/Config.per_page) + Math.min(this.collection.count%Config.pagination.length, 1);
			},

			onShow: function() {
				var paginationCount = this._getPaginationCount();
				this.$('#page-' + this.collection.options.page).toggleClass("active");
				this.$('#page-' + this.collection.options.page).click(false);
				if (this.collection.options.page === 1) {
					this.$('#page-«').toggleClass("disabled");
					this.$('#page-«').click(false);
				}
				if (this.collection.options.page === paginationCount) {
					this.$('#page-»').toggleClass("disabled");
					this.$('#page-»').click(false);
				}
			},

			_buildPagination: function(start) {
				this.pagination = [];
				this.pagination.push('&laquo;');
				var paginationCount = this._getPaginationCount();
				for (var i = start; i <= start + Math.min(Config.pagination.length - 1, paginationCount - start); i++) {
					this.pagination.push(i);
				}
				this.pagination.push('&raquo;');
			},
			clickPagination: function(event) {
				event.preventDefault();
				this.$el.fadeOut('fast', function() {
					var number = event.currentTarget.id.slice(event.currentTarget.id.indexOf('-')+1, event.currentTarget.id.length);
					if (number === '«') {
						App.trigger("route:page", {name: this.collection.options.name, page: this.collection.options.page-1});
					}
					else if (number === '»') {
						App.trigger("route:page", {name: this.collection.options.name, page: this.collection.options.page+1});
					}
					else { 
						App.trigger("route:page", {name: this.collection.options.name, page: number});
					}
				}.bind(this));
			},
			serializeData: function() {
				var data = this.collection.toJSON();
				data.pagination = this.pagination;
				data.name = Config.Dict[this.collection.options.name];
				return data;
			}
		});
		List.PageLayout = Marionette.LayoutView.extend({
			template: itemLayoutTpl,
			regions: {
				menuRegion: '#menu-region',
				loadingRegion: '#loading-region',
				listRegion: '#list-region',
				filterRegion: '#filter-region'
			}
		})
	});
});