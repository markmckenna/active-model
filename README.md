active-model
============

A data-driven programming model for node.js

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
		var widget = orders.select('//product[@id = "widget"]'); // or just #widget
		widget.add('description', 'This is a widget.');

		// Monitor future changes to this widget
		widget.changed(function(node, property, oldval, newval) {
			console.log("Somebody changed the widget's" + property + " from " + oldval + " to " + newval + "!");
		})
	});

features
========

	* Parse any DOM-compatible document into a data model, and serialize the data model back to disk.
	* Listen for any modification of the data model
	* Uses JSDOM for internal management of data
	* Uses Sizzle for powerful CSS selector-based data querying and identification