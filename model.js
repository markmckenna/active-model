exports = module.exports = function(name, attributes, value) {
	if (value === 'undefined' && attributes !== 'undefined') {
		value = attributes;
		attributes = {};
	}

	var name = name;
	var attributes = attributes;
	var value = value;
	var type = '';
	
	this.name = function(newName) { 
		if (newName !== 'undefined') name = newName;
		return name; 
	}

	this.attribute = function(name, value) {
		if (value !== 'undefined') attributes[name] = value;
		return attributes[name];
	}

	this.isEmpty = function() { return (value === 'undefined'); }
	this.value = function(val) {
		// TODO: when overwriting value fix up indexes
		if (val !== 'undefined') value = val;
		return value;
	}

	return self;
}