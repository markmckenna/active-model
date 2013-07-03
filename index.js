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

	this.get = function(query) {
		// Sort of a one-shot version of 'list', above.  Returns (shallow) data, not a generator.  Generally a briefer way to get the data
		// that <list> returns above, though not always (compare '/children').

		// Examples, given contents of (test/test.json):
		//		Query 							Result
		//		model.get('/')					{ surname: 'Graydon', children: <Generator> }
		//		model.get('/surname')				'Graydon'
		//		model.get('/children')			[ <Generator>, <Generator>, <Generator> ]
		//		model.get('/children/0')		{ name: 'Mark', age: 34 }
		//		model.get('/children/*/name')	[ 'Mark', 'Alex', 'Andrew' ]

		var cur = _data;
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


function Query(model, path) {
	// TODO: Pass instance to self into query language interpreter to be filled up

	var _model = model;
	var _path = path;

	get model() { return _model; }
	get path() { return _path; }

	// TODO: value below can be a function which gets called with the result being modified relative to in each case.

	function get(query) { 
		// TODO: as per base-level query but starting with this result set (interpreted as an array)
	}

	function clone() {
		// TODO: Return a deep copy of the selected subtree
	}

	function add(value) {
		// TODO: add the given value to the set of results matched by the query
	}

	function before(value) {
		// TODO: add the given value before each element in the query
	}

	function after(value) {
		// TODO: add the given value after each element in the query
	}

	function replace(value) {
		// TODO: replace all matches to this query with <value> without parsing it first.
		// if value is an object or array it is attached as-is to the model and fires all appropriate events.
		// fires events as per json() above.
	}

	function remove() {
		// TODO: Eliminate all items matching this query.
		// will fire delete events for any objects in the deleted tree.
	}

	function empty() {
		// TODO: Eliminate all children of all items matching this query.
	}

	function json(value) {
		// TODO: parse <value> as JSON and replace all matches to this query with it.
		// will compare the structures of the two trees and fire modify events for modified objects, delete
		// events for deleted objects, and add events for new objects.
	}

	function on(action, cb) {
		// TODO: Hook up a function to be invoked when the given action (add, modify, delete) is seen
		// cb matches function(event), where <event> indicates what happened
	}
}

exports.prototype.NotYetImplemented = { 
	name: "NotYetImplemented", 
	description: "This call is not yet implemented."
}