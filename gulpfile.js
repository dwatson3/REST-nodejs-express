var gulp = require('gulp'),
	nodemon = require('gulp-nodemon');

// With gulp, we are running on Port 8000
gulp.task('default', function() { 
	nodemon({
		script: 'app.js',
		ext: 'js',
		env: {
			PORT: 8000
		},
		ignore: ['./node_modules/**']
	})
	.on('restart', function(){
		console.log('Restarting');
	});
});