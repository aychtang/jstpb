var cheerio = require('cheerio');
var request = require('request');
var base_url = 'http://proxybay.eu/search/';

var search = function(query, cb) {
	request(base_url + query, function(err, response, body) {
		if (!err) {
			$ = cheerio.load(body);
			var result = [];
			$('#searchResult .detName').each(function() {
				result.push(this.html());
			});
			cb(result);
		}
	});
};

var formatTitle = function(title) {
	title = title.toLowerCase().split(' ').join('_');
};

search('The_Last_Samurai', function(result) {
	console.log(result[0]);
});
