var cheerio = require('cheerio');
var request = require('request');
var input = process.argv;
var base_url = input[3] || 'http://proxybay.eu';

var search = function(query, cb) {
	request(base_url + '/search/' + query, function(err, response, body) {
		if (!err) {
			$ = cheerio.load(body);
			var result = [];
			$('#searchResult .detName > a').each(function() {
				result.push(base_url + this.attr('href'));
			});
			cb(result);
		}
	});
};

var formatTitle = function(title) {
	return title.toLowerCase().split(' ').join('_');
};

search(formatTitle(input[2]), function(result) {
	console.log(result);
});
