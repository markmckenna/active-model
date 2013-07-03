// Parses the selector syntax.

var selectors = exports.selectors = [ 'self', 'all', 'parent', 'key', 'list', 'union', 'text' ];
var expressions = exports.expressions = [ 'exists', 'equals', 'compares', 'matches', 'or', 'and', 'not', 'any', 'all', 'eval' ];

exports.Selector = function(type, expr, args) {
	this.type = type;
	this.args = args;
	this.expr = expr;
}

exports.Expression = function(type, args) {
	this.type = type;
	this.args = args;
}


// Parser for XPath-like syntax into AST

var tokenpat = new RegExp('^([^[]*)(?:\[(.*)\])?$');

// patterns to match for, in order of priority
var patterns = [
	{ type: 'list', 	pat: new RegExp('^\w+,(?:\w+,)*\w+$'), 					make: makeList },
	{ type: 'text',		pat: new RegExp('^text\(\)$'), 							make: makeNoargMaker('text') },
	{ type: 'self',		pat: new RegExp('^\.$'),								make: makeNoargMaker('self') },
	{ type: 'parent',	pat: new RegExp('^\.\.$'),								make: makeNoargMaker('parent') },
	{ type: 'all',		pat: new RegExp('^\*$'),								make: makeNoargMaker('all') },
	{ type: 'range',	pat: new RegExp('^-?\d+\:(?:-\d)?\d*$|^\:-?\d+$'),		make: makeRange },
	{ type: 'key',		pat: new RegExp('^\w+$'), 								make: makeKey }
]

var expressions = [
	{ type: 'or', 			parse: parseBinaryInfix('|'),
	{ type: 'and', 			parse: parseBinaryInfix('&'),
	{ type: 'not', 			parse: parseUnaryPrefix('!'),

	{ type: 'equals',		parse: parseBinaryInfix('='),
	{ type: 'compares',		parse: parseBinaryInfix(/[><]=?|!=/),
	{ type: 'matches',		parse: parseBinaryInfix('?'),

	{ type: 'any', 			parse: parseModifier('any'),
	{ type: 'all', 			parse: parseModifier('all'),

	{ type: 'selector', 	parse: parse, 
]


function makeNoargMaker(type) {
	return function(tok, expr) { return new Selector(type, expr); };
}

function makeList(tok, expr) {
	return new Selector('list', tok.split(','), expr);
}

function makeRange(tok, expr) {
	if (tok.startsWith(':'))
		return new Selector('range', expr, [ null, tok.split(':')[1] ]);
	else if (tok.endsWith(':'))
		return new Selector('range', expr, [ tok.split(':')[0], null ]);
	else
		return new Selector('range', expr, tok.split(':'));
}

function makeKey(tok, expr) {
	return new Selector('key', expr, tok);
}


function parseBinaryInfix(op) {
	return function(expr) {
		
	}
}


function parse(query) {
	var errors = [];

	var out = parseQuery(query);

	if (errors.length > 0) {
		console.log('Errors found while parsing query string:');
		for (var err in errors)
			console.log('  ' + errors[err]);
		console.trace('Current stack trace:');
		return undefined;
	}

	return out;


	function parseQuery(query) {
		// TODO: parse query, yielding abstract syntax tree for query.

		if (query === undefined) errors.push('no query string provided');

		var out = [];

		var tokens = query.split(/\s*\/\s*/); // split string into tokens, ignoring whitespace adjacent to separators

		if (tokens[0] === '') tokens.shift(); // ignore leading empty token if present

		for (var i in tokens)
			out.push(parseToken(tokens[i])); // parse each token

		return out;
	}


	function parseToken(token) {
		var tok = tokenpat.exec(tokens[i]).slice(1, 3); // split token into unit and expression parts

		if (tok[0] === undefined) errors.push('unparseable token' + token) && return undefined;

		// TODO: parse expression if present
		var expr = undefined;
		if (tok[1] !== undefined)
			expr = parseExpr(tok[1]);

		for (var p in patterns) {
			if (patterns[p].pat.test(tok[0])) {
				out.push(patterns[p].make(tok[0], expr));
				break;
			}
		}
	}

	function parseExpr(expr) {

	}
}

exports.parse = parse;