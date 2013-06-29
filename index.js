// Allows you to present a datamodel in an active DOM-like structure.
// Each element 

// TODO: transactional data model

var fs = require('fs');
var sstream = requre('node-sstream');

// First things first... serialize/deserialize the data model.
exports = module.exports = function Model(file, options) {
	this.file = file;

	var data = {};

	this.load = function(done) {
		var istream = fs.createReadStream(file, { mode: 'rx' });
		var buffer = '';
		var iss = new sstream.StreamToString();
		istream.pipe(iss);

		iss.on('finish', function() {
			data = JSON.parse(iss.data);
		});
	}

	this.monitor = function(done) {
		// TODO: Watch the bound file for changes and reload the data model when it does?
		// TODO: Merge loaded data into existing data model?  Somehow?  Maybe?
		done(this.NotYetImplemented);
	}

	this.save = function(done) {
		// TODO: stringify asynchronously?
		// TODO: if async stringification, protect data against concurrent writes

		// option 'highWaterMark' indicates # bytes before write() returns false; default 16k
		var ostream = fs.createWriteStream(file+'.tmp', { mode: 'wx' });
		var oss = new sstream.StringToStream(JSON.stringify(data)); 
		oss.pipe(ostream);
	}

	load(file);
}


exports.prototype.NotYetImplemented = { 
	name: "NotYetImplemented", 
	description: "This call is not yet implemented."
}