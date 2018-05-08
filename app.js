var express = require('express');
	mongoose = require('mongoose');
	bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');

// creating an instance of express in this file
var app = express();

// creating a port to view this application on
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true})); 
app.use(bodyParser.json()); // returns middleware that only parses JSON

var bookRouter = express.Router();

bookRouter.route('/Books')
	.post(function(req, res) { // sending a POST request 
		var book = new Book(req.body);

		// console.log(book);
		book.save();				// saving the Book
		// res.send(book);
		res.status(201).send(book); // sending back the 201 status to let us know that the Book was created
	})

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

bookRouter.use('/:bookId', function(req, res, next) {
	Book.findById(req.params.bookId, function(err, book) {
		if(err) 
			res.status(500).send(err);
		
		else if(book) {
			req.book = book;
			next();
		
		} else {
			res.status(404).send('No book found');
		}
	});
})	

bookRouter.route('/Books/:bookId') //accessing the API by a single query Book Id
	.get(function(req, res) {
		res.json(req.book);
	})

	.put(function(req, res) {	// accessing the API by put, to add new Book information and save it
		Book.findById(req.params.bookId, function(err, book) {
			if(err)
				res.status(500).send(err);
			else
				book.title = req.body.title;
				book.author = req.body.author;
				book.genre = req.body.genre;
				book.read = req.body.read;
				// book.save();	// saving the new Book information
				req.book.save(function(err) {
					if(err)
						res.status(500).send(err);
					else {
						res.json(req.book);
				}
		});
				res.json(book);
				res.json(req.book);
		});
		return bookRouter;
	})

	.patch(function(req, res) {
		if(req.body._id)
			delete req.body._id;
		for(var p in req.body) { // using a for/in loop
			req.book[p] = req.body[p];
		}
		req.book.save(function(err) {
			if(err)
				res.status(500).send(err);
			else {
				res.json(req.book);
			}
		});
	})


app.use('/api/books', bookRouter);
// app.use('/api/authors', authorRouter); // added an authorRouter to be able to access API by Author Name



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