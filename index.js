var cheerio = require('cheerio');
var request = require('request');
var input = process.argv;

var tpb = function(baseUrl) {
	this.baseUrl = baseUrl;
};

tpb.prototype.search = function(query, cb) {
	var baseUrl = this.baseUrl;
	request(baseUrl + '/search/' + query, function(err, response, body) {
		if (!err) {
			var $ = cheerio.load(body);
			var result = [];
			$('#searchResult .detName > a').each(function() {
				result.push(baseUrl + this.attr('href'));
			});
			cb(result);
		}
	});
};

tpb.prototype.formatTitle = function(title) {
	return title.toLowerCase().split(' ').join('_');
};

var t = new tpb(input[3] || 'http://proxybay.eu');

t.search(t.formatTitle(input[2]), function(result) {
	console.log(result);
});
