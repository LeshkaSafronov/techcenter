define(["marionette"], function (Marionette) {
	var App = new Marionette.Application();
	App.addRegions({
		headerRegion: '#header',
		sourceRegion: '#source',
		dialogRegion: '#dialog-region'
	});
	App.UrlToJSON = function (url) {
		if (url === null) {
			return {};
		}
		params = {};
		data = url.split('&');
		for (var i = 0; i < data.length; i++) {
			params[data[i].split('=')[0]] = data[i].split('=')[1];
		}
		return params;
	}
	App.parseToken = function(response) {
		var r = response.lastIndexOf('"') - 1;
		var l = response.lastIndexOf('"', r-1) + 1;
		return response.substr(l, r-l+1);
	}
	
	App.getCart = function() {
		var promise = promise || $.ajax('api/home');
		return promise;
	}
	return App;
});
