var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var uuid = require('node-uuid')
var mongoose = require('mongoose');
var data = require('./public/data/menu.json')
var fixation = require('express-session-fixation');

const helmet = require('helmet');

var fixation = require('express-session-fixation');

var csrf = require('csurf')    //csrf module
var bodyParser = require('body-parser')    //for body parsing
// var Models = require('./models/schema')
var env = process.env;

//console.log(env);
morgan.token('id', function getId(req) {
  return req.id
})

function assignId(req, res, next) {
  req.id = uuid.v4()
  next()
}
/*mongoose.connect('mongodb://dev:razorpod123@ds155916.mlab.com:55916/mnre', {
  useNewUrlParser: true
});*/
mongoose.connect('mongodb://localhost:27017/mnre', { useNewUrlParser: true });
mongoose.set('debug', true);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Conected to Mongoose Service')
});

var indexRouter = require('./routes/index');
var hbs = require('express-handlebars');

var app = express();
console.log(app.get('port'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('trust proxy', 1) // trust first proxy
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/pages/partials/',
  helpers: require("./public/js/helpers/helpers.js").helpers,
}));

app.use(helmet())
app.disable('x-powered-by');
app.use(helmet.noCache());
app.use(helmet.xssFilter());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));



app.use(assignId);
// app.use(morgan(':id :method :url :response-time'));

app.use(express.json({ limit: '50mb' }));
app.use(session({
  secret: 'ssshhhhh',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: (10 * 60 * 1000) },
}));
// 10 minutes session  

// Register with express
app.use(fixation({}));

app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', require('./routes/users'));
app.use('/mail', require('./routes/mail'))
app.use('/subscription', require('./routes/subscription'))



//var WHITELIST_IPS =['::1','127.0.0.1']; //for localhost use ::1
var WHITELIST_IPS = ['42.111.1.87', '111.93.124.3', '111.93.124.2', '182.75.234.75', '182.75.234.74',
  '150.242.65.5', '::1', '127.0.0.1']
var getClientIp = function (req) {
  var ipAddress = req.connection.remoteAddress;
  if (!ipAddress) {
    return '';
  }
  // convert from "::ffff:192.0.0.1"  to "192.0.0.1"
  if (ipAddress.substr(0, 7) == "::ffff:") {
    ipAddress = ipAddress.substr(7)
  }
  return ipAddress;
};
var ipMiddleware = function (req, res, next) {
  var ipAddress = getClientIp(req);
  var check = WHITELIST_IPS.indexOf(ipAddress);
  console.log("IP Filter Check, IP Address:", ipAddress, ", Is Found: ", check);
  if (check !== -1) {
    next();
  } else {
    // res.send(ipAddress + ' IP is not in whiteList');        
    res.status(403);
    if (req.accepts('html')) {
      res.render('pages/403-unauthorized', {
        layout: 'index_p',
        url: req.url,
        menu: data
      });
      return;
    }

  }
};


app.use('/admin', require('./routes/admin'));
app.use('/meta', require('./routes/meta'));
app.use('/docs', require('./routes/documents'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('pages/not-found', {
      layout: 'index_p',
      url: req.url,
      menu: data
    });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({
      error: 'Not found'
    });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});



// error handler
app.use(function (err, req, res, next) {
  // res.json({ err });
  // return false
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  //res.json({data :error})
});

/*app.use(function (req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.set('Pragma', 'no-cache');
  next();
}); */

// var app = express()
app.use(function (req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next()
});








module.exports = app;
