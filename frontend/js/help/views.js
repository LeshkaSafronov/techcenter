define(["app",
		"tpl!templates/help/help.tpl"], function(App, helpTpl) {
	App.module("StoreApp.Help", function(Help, App, Backbone, Marionette, $, _) {
		Help.View = Marionette.ItemView.extend({
			template: helpTpl,

			events: {
				'click .help' : 'showCategory'
			},

			initialize: function() {
				this.current = undefined;
				this.previous = undefined;
			},

			showCategory: function(e) {
				this.current = e.target.id + '-bar';
				if (this.current !== this.previous) {
					if (!_.isUndefined(this.previous)) {
						this.$('#' + this.previous).hide();
						this.$('#' + this.previous.slice(0, this.previous.length-4)).css("font-weight", "normal");
					}
					this.$('#' + this.current).show();
					this.$('#' + e.target.id).css("font-weight", "Bold");
				}
				this.previous = this.current;
			},

			onShow: function() {
				this.$('.help-bar').hide();
				this.$('#order-bar').show();
				this.previous = 'order-bar';
				this.$('#order').css("font-weight", "Bold");

			}
		});
	});
});