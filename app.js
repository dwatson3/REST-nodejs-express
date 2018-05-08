var express = require('express');
	mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');

// creating an instance of express in this file
var app = express();

// creating a port to view this application on
var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route('/Books')
	.get(function(req, res) {
		// var responseJson = {hello: "This is my API"};

		var query = {};

		if (req.query.genre) { // allows to filter on genre information
			query.genre = req.query.genre;
		}

		Book.find(query, function(err, books) {
			if(err) {
				// console.log(err)
				res.status(500).send(err)
			} else {
				res.json(books);
			};
		});
	})

bookRouter.route('/Books/:bookId') //accessing the API by a single query Book Id
	.get(function(req, res) {

		Book.findById(req.params.bookId, function(err, book) {
			if(err) 
				res.status(500).send(err);
			  else 
				res.json(book);
		});
	});


app.use('/api', bookRouter);




// req is the request sent by the client
	// res is the response that we will send back
app.get('/', function(req, res) {
	res.send('Welcome to my API!')
});

// to be able to listen to port by calling from
	// command line: node app.js
	// Response is 'Running on PORT: 3000'
app.listen(port, function () {
	console.log('Gulp is running my app on PORT: ' + port);
});