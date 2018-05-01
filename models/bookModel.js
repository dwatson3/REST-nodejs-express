var mongoose = require('mongoose'),

// var Schema = mongoose.Schema({
		// path: {type:String, required:true},
		// title: {type:String, required: true}
	// });

	Schema = mongoose.Schema();

var schema = mongoose.Schema({
	path: {type: String, required: true},
	title: {type: String, required: true}
})

var bookModel = mongoose.Schema({
	title: {
		type: String
	},
	author: {type: String},
	genre: {type: String},
	read: {type: Boolean, default: false}
});

module.exports = mongoose.model('Book', bookModel);