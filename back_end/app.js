const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session')
const app = express();

const index = require('./routes/index');
const users = require('./routes/users');
const records = require('./routes/records');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//session
app.use(cookieParser('expressSession'));
app.use(session({
  secret: 'expressSession', // 与cookieParser中的一致
  resave: true,
  saveUninitialized:true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));
// public floder
app.use(express.static(path.join(__dirname, 'public')));

//router
app.use('/', index); //主页渲染前端页面
app.use('/api/users', users);
app.use('/api/records', records);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
