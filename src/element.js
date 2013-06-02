// Defines an element, which can have attributes and a typed value.
// Value may have scalar, vector (list) or structured (nested Element) type.

// General ideas:
// * If this node has children, maintain an index of the ids and classes present within the subtree rooted at this node
// * If this node has a class property, make sure it's parsed out into an array
// * When modifying the class property, notify its owner of the change

var EmptyType = 'empty';
var ScalarType = 'scalar';
var VectorType = 'vector';
var StructuredType = 'structured';

exports = module.exports = function(parent, name, attributes, value) {
	// attributes and value are both optional, but attributes is eliminated first
	if (value === 'undefined' && attributes !== 'undefined') {
		value = attributes;
		attributes = {};
	}

	// private values
	var _parent = parent;
	var _name = name;
	var _attributes = attributes;
	var _value = '';
	var _type = EmptyType;

	var _idindex = {};
	var _classindex = {};

	// Maintain internal notion of value type
	function setValue(val) {
		_value = val;

		if (_value === 'undefined')
			_type = EmptyType;
		else
			switch (typeof _value) {
				case 'Array': _type = VectorType; break;
				case 'Object': _type = StructuredType; break;
				default: _type = ScalarType; break;
			}
	}

	function addAttribute(name, value) {

	}

	function deleteAttribute(name, value) {

	}

	setValue(value); // initialize the Element

	this.name = function() { // return the element name (immutable; more like a type than a name, really)
		return _name; 
	}

	this.attributes = function(atts) { // 0-arg: return copy of attribute map; 1-arg: replace attributes with elements of new attribute map
		if (atts !== 'undefined') { // TODO: Update indices
			_attributes = {};		// TODO: values are only empty, scalar or vector; no element-typed attribute
			for (var i in atts)		// TODO: id, class are special; id is always string; class is always vector of strings
				_attributes[i] = _atts[i];
			return atts;
		} else {
			var out = {};
			for (var i in _attributes)
				out[i] = _attributes[i];
		}

	}

	this.attribute = function(name, value) { // 1-arg: return the 
		if (value !== 'undefined') _attributes[name] = value;
		return _attributes[name];
	}

	this.isEmpty = function() { return (_type === EmptyType); }
	this.value = function(val) {
		// TODO: when overwriting value fix up indexes
		setValue(val);
		return _value;
	}
}