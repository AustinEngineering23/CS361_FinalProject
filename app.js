var express = require('express');
var mysql = require('./dbcon.js');
var app = express();
const path = require('path');
const router = express.Router();

app.set('port', process.env.PORT || 8080);
app.use(express.static('public'));

//to render the login page homepage
app.get('/', function(req,res,next){
	res.sendFile(__dirname + '/public/login.html');
});

app.get('/login', function(req,res,next) {
	// var username = req.body.username;
	// var password =  req.body.password;
	// var context = {};
	// var sqlString = "SELECT * from `Users` WHERE username = ? AND password = ?", username, password;
	res.redirect('/login_success');
});

app.get('/login_success', function(req,res,next) {
	res.sendFile(__dirname + '/public/homepage.html');
});

app.get('/signup-page', function(req,res,next) {
	res.sendFile(__dirname + '/public/signup.html');
});

app.get('/signup', function(req,res,next) {
	res.redirect('/signup_success');
});

app.get('/signup_success', function(req,res,next) {
	res.sendFile(__dirname + '/public/homepage.html');
});
app.get('/logout', function(req,res,next) {
	res.redirect('/');
});

// app.use(function(req,res){
//   res.status(404);
//   res.render('404');
// });

// app.use(function(err, req, res, next){
//   console.error(err.stack);
//   res.status(500);
//   res.render('500');
// });

app.use('/', router);

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
