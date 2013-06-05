// Allows you to present a datamodel in an active DOM-like structure.
// Each element 

var dom = require('jsdom/level1/core').dom.level1.core;
var fs = require('fs');

// First things first... serialize/deserialize the data model.
exports = module.exports = function(file, options) {
	var hnd = fs.open(file, 'r');
	var doc = dom(hnd);
}