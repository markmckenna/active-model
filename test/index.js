var should = require('should');

describe('Model', function() {
	var Model = require('..');
	var model = null;

	it('should asynchronously load itself on creation', function(done) {
		model = new Model('test.xml', function() {
			model.should
			done();
		});
	});


});