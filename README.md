active-model
============

A DOM-like data model implementation for node.js.

example
=======

orders.js
---------
	var model = require('active-model');

	model.parse('
		<orders>
			<order id='1', class='personal bulk'>
				<product id='widget' class='online-only'>
					<name>A widget</name>
					<cost currency='USD'>100.00</cost>
				</product>
				<quantity>100</quantity>
			</order>
		</orders>
	', function(orders) {
		console.log('Found ' + orders.select('/orders/order').length + ' orders');
		console.log('Online products: ' + JSON.stringify(orders.select('.online-only')));
		var widget = orders.select('//product[@id = "widget"]');
		widget.addElement('description', )
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
