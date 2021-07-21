var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');
var authenticate = require('./authenticate');

var config = require('./config');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var estimateRouter = require('./routes/estimate');

const mongoose = require('mongoose');
const url = config.mongoUrl;
const connect = mongoose.connect(url);
connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });


var app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(session({
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());



app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/js/'));
app.use('/functions', express.static(__dirname + '/utility_functions/'));

app.use('/', indexRouter)
app.use('/users', usersRouter);
app.use('/estimate', estimateRouter);

app.get('/dashboard', connectEnsureLogin.ensureLoggedIn('/users/login'), (req, res) => {
  res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID} 
   and your session expires in ${req.session.cookie.maxAge} 
   milliseconds.<br><br>
   <a href="/logout">Log Out</a><br><br>
   <a href="/secret">Members Only</a>`);
});

app.get('/secret', connectEnsureLogin.ensureLoggedIn('/users/login'), (req, res) => {
  res.render('secretpage');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler


module.exports = app;
