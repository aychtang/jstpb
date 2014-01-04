var tpb = require('./index.js');
var input = process.argv;

var t = new tpb(input[3] || 'http://proxybay.eu');

t.search(t.formatTitle(input[2]), function(result) {
	console.log(result);
});
