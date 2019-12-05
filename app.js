const express = require('express');
const app = express();
const mysql = require('./dbcon.js');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');


app.set('port', process.env.PORT || 9025);
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));


//to render the login page homepage
app.get('/', function(req,res,next){
	res.sendFile(__dirname + '/public/login.html');
});

app.post('/auth', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
		mysql.pool.query('SELECT * FROM Users WHERE username = ? AND password = ?', [username, password], function(err, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
				res.redirect('/login_success')
			} else {
				res.redirect('/signup-page');
			}
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

app.post('/signup', function(req,res,next) {	
	var username = req.body.username;
	var password = req.body.password;
	var fName = req.body.fname;
	var lName = req.body.lname;
	var email = req.body.email;
	var phone = req.body.phone;
	var address = req.body.address;

	if (username && password) {
		mysql.pool.query('INSERT INTO `Users` (`username`, `password`, `fname`, `lname`, `email`, `phone`, `address`) VALUES(?,?,?,?,?,?,?)', 
			[username, password, fName, lName, email, phone, address], function(err, results, fields) {
			req.session.loggedin = true;
			req.session.username = username;
			res.redirect('/signup_success');
		});
	} else {
		res.send('Email or Password missing');
	}
	
});

app.get('/report_page', function(req,res,next) {
	res.sendFile(__dirname + '/public/report_page.html');
});

app.get('/login_success', function(req,res,next) {
	if (req.session.loggedin) {
		res.sendFile(__dirname + '/public/homepage.html');
	} else {
		res.send('Please login to view this page');
	}
});

app.get('/signup-page', function(req,res,next) {
	res.sendFile(__dirname + '/public/signup.html');
});

app.get('/signup_success', function(req,res,next) {
	if (req.session.loggedin) {
		res.sendFile(__dirname + '/public/homepage.html');
	} else {
		res.send('Please login to view this page');
	}
});
app.get('/logout', function(req,res,next) {
	req.session.loggedin = false;
	req.session.username = null;
	res.redirect('/');
});
app.get('/adminLogin', function(req,res,next) {
	res.sendFile(__dirname + '/public/adminLogin.html');
});
app.get('/deviceView', function(req,res,next){
	res.sendFile(__dirname + '/public/deviceView.html');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
