var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var env = require('dotenv').config();
var flash = require('connect-flash');
var bcrypt = require('bcryptjs');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var moment = require('moment');
var ObjectID = require('mongodb').ObjectID;

moment().format();

const tls = require('tls');


var app = express();
var mesaubreDB = {
	db:null
};

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);




server.listen(process.env.SERVER_PORT);

/* session */
app.use(cookieParser());
app.use(

	session({
		secret: '3122swq89a22asd1231sad3',
		resave: false,
		saveUninitialized: true,
		rolling: true,


		cookie: {
			// secure: true,
			// expires : 20000
			maxAge: 10800000 // set the session lifetime for 3 hour
		}
	}
));

/* flash */
app.use(flash());

/* middleware */
app.use(function(req,res,next){

	/* if path is assets go next */
	if( req.path.includes('/public') || req.path.includes('/imgs') ) {
		next(); return;
	}

	/* store the messages */
	res.locals.success_message = req.flash('success_message') || null;
	res.locals.error_message = req.flash('error_message') || null;

	/* store the user */
	res.locals.user = req.session.user || null ;
	res.locals.partner = req.flash('partner') || null ;

	next();
});

/* view engine setup with layouts */
app.engine('ejs', require('express-ejs-extend'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());


/* error handler */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


mongoClient.connect( process.env.MONGO_URL, function(err, db) {
	mesaubreDB.db=db;
});


/* check the is user is auth */
var isAuth = function isAuth(req,res,next) {
	if (req.session.user != undefined) {
		mesaubreDB.db.collection('users').findOne({_id: ObjectID(req.session.user._id)},function( err, user ) {
			req.session.user = user;
			next();
			return;
		});

	}else {
		req.flash('error_message', 'გთხოვთ გაიაროთ ავტორიზაცია' );

		res.redirect('/');
		return;
	}
};








const addon = require('./build/Release/addon');

var obj = { x:0 };
// save the target JS object in the addon
console.log(addon.setup(obj));
console.log(addon.setup(obj));
console.log(addon.mutate(obj));

console.log(addon.mutate(obj));

console.log(addon.mutate(obj));

app.get('/', function (req, res) {

	console.log(addon.setup(obj));

})























/* catch 404 and forward to error handler */
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

/* error handler */
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});



/* export the module */
