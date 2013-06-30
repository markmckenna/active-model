// Allows you to present a datamodel in an active DOM-like structure.
// Each element 

// TODO: transactional data model

require('underscore');

var fs = require('fs');
var sstream = require('node-sstream');

// First things first... serialize/deserialize the data model.
exports = module.exports = function Model(options, done) {
	if (typeof done === undefined && typeof options === 'function') {
		done = options;
		options = undefined;
	}

	if (typeof options === undefined) options = {};

	this.file = options.file;
	this.autoload = options.autoload || false;
	this.autosave = options.autosave || false;

	var _loaded = false;
	get loaded() { return _loaded; }

	var _dirty = false;
	get dirty() { return _dirty; }

	var _data = {};

	// TODO: Signals

	this.load = function(done) {
		var istream = fs.createReadStream(file, { flags: 'r' });
		var buffer = '';
		var iss = new sstream.StreamToString();
		istream.pipe(iss);

		iss.on('finish', function() {
			_data = JSON.parse(iss.data);
			_loaded = true;
			_dirty = false;
			done();
		});
	}

	
	this.monitor = function(done) {
		// TODO: Watch the bound file for changes and reload the data model when it does?
		// TODO: Merge loaded data into existing data model?  Somehow?  Maybe?
		done(this.NotYetImplemented);
	}


	this.list = function(query) {
		// TODO: Parse query as an XPath-like pathing string.
		//
		// Return a lazy generator (with prototype activeModel.Generator) representing the data matching the query.
		// Each call to the generator returns the next match in sequence.
		// When results are exhausted, all calls return undefined.
		// The function has a property 'count' which indicates how many remaining elements there are; null if unknown.
		// If a result is a literal value, the literal value is returned.
		// If a result is an array of k entries, an array with k elements is returned, where each literal entry is itself,
		// 	 and each nonliteral entry is another lazy function.
		// If a result is an object value, an object with the same property keys is returned, where each property with a literal value has
		//   that value, each property with a function value has that function, and each array or object value is another lazy generator function.
		// Note that the model cannot be mutated through these calls.

		// Examples, given contents of (test/test.json):
		//		Query 							Call 1 											Call 2
		//		model.list('/')					{ surname: 'Graydon', children: <Generator> }		undefined
		//		model.list('/surname')				'Graydon'										undefined
		//		model.list('/children')			{ name: 'Mark', age: 34 }						{ name: 'Alex', age: 25 }
		//		model.list('/children[0]')		{ name: 'Mark', age: 34 }						undefined
		//		model.list('/children/*/name')	'Mark'											'Alex'
	}

	this.get = function(query) {
		// Sort of a one-shot version of 'list', above.  Returns (shallow) data, not a generator.  Generally a briefer way to get the data
		// that <list> returns above, though not always (compare '/children').

		// Examples, given contents of (test/test.json):
		//		Query 							Result
		//		model.get('/')					{ surname: 'Graydon', children: <Generator> }
		//		model.get('/surname')				'Graydon'
		//		model.get('/children')			[ <Generator>, <Generator>, <Generator> ]
		//		model.get('/children[0]')		{ name: 'Mark', age: 34 }
		//		model.get('/children/*/name')	[ 'Mark', 'Alex', 'Andrew' ]
	}

	// TODO: the Generator instances buried in shallow trees, above, should have facilities similar to this object--for calling get(), list(), etc. on.
	// TODO: Nail down the spec for modifying the model.  Should be able to do something like:
	// * set('/surname', 'Hill');
	// * set('/children/*/age', function(age) { return age+1; });
	// * list('/children')[0].set('name', 'Marcus');

	
	this.save = function(done) {
		// TODO: stringify asynchronously?
		// TODO: if async stringification, protect data against concurrent writes

		// option 'highWaterMark' indicates # bytes before write() returns false; default 16k
		var ostream = fs.createWriteStream(file+'.tmp', { flags: 'w' });
		var oss = new sstream.StringToStream(JSON.stringify(_data)); 
		oss.pipe(ostream);
		ostream.on('finish', function() {
			_dirty = false;
			done();
		})
	}


	this.load(done);
}


exports.prototype.NotYetImplemented = { 
	name: "NotYetImplemented", 
	description: "This call is not yet implemented."
}