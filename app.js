var express = require('express');

// creating an instance of express in this file
var app = express();

// creating a port to view this application on
var port = process.env.PORT || 3000;

// req is the request sent by the client
	// res is the response that we will send back
app.get('/', function(req, res) {
	res.send('Welcome to my API!')
});

app.listen(port, function () {
	console.log('Running on PORT: ' + port);
});