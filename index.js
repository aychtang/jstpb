var cheerio = require('cheerio');
var request = require('request');

var tpb = function(baseUrl) {
	this.baseUrl = baseUrl || 'http://proxybay.eu';
};

tpb.prototype.search = function(query, cb) {
	var baseUrl = this.baseUrl;
	request(baseUrl + '/search/' + query, function(err, response, body) {
		if (!err) {
			var $ = cheerio.load(body);
			var result = [];
			$('#searchResult > tr').each(function() {
				result.push({
					url: baseUrl + this.find('.detLink').attr('href')
				});
			});
			typeof cb === 'function' && cb(result);
		}
	});
};

tpb.prototype.formatTitle = function(title) {
	if (!title) return null;
	return title.toLowerCase().split(' ').join('_');
};

module.exports = tpb;
