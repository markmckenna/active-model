active-model
============

A DOM-like data model implementation for node.js.

example
=======

orders.js
---------
	var model = require('active-model');

	new Model('orders', [
		new Element('order', { id: '1', class: 'personal bulk' }, [
			new Element('product', { class: 'online-only' }, [
				new Element('name', 'A widget'),
				new Element('cost', { currency: 'USD' }, 100.0)
			]),
			new Element('quantity', 100)
		]); // name, value, attributes
	], function(model) {
		console.log('Found ' + orders.find('order').length + ' orders');
	});


assembled document (XML representation)
---------------------------------------
	<orders>
		<order id='1' class='personal bulk'>
			<product class='online-only'>
				<name>A widget</name>
				<cost currency='USD'>100.0</cost>
			</product>
		</order>
	</orders>

features
--------

* Differentiation between ownership and reference
* Events for triggered operations on model components
* Indexed id, class properties for fast searchability
* DOM-like node collectors
* (?) jQuery interoperability (or at least, jQuery workalike)
