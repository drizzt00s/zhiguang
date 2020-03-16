var createError = require('http-errors');
var express = require('express');
var path = require('path');
var busboy = require('connect-busboy');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
app.use(busboy()); // 注意：这个一定要写在所有的路由中间件之前
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(session({
  name:"sessionId",
  secret:"la10018__12Aty"
  // cookie:{maxAge: 60000}
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin')
var adminLoginRouter = require('./routes/adminLoginRouter');
var adminPanelRouter = require('./routes/adminPanelRouter');
var registerRouter =  require('./routes/registerRouter');
var userRegisterRouter = require('./routes/userRegisterRouter');
var adminRegisterRouter = require('./routes/adminRegisterRouter');
var userInfoRouter = require('./routes/userInfoRouter');
var loginRouter = require('./routes/loginRouter');
var loginPostRouter = require('./routes/loginPostRouter');
var logoutRouter = require('./routes/logoutRouter');
var userInfoCompleteRouter = require('./routes/userInfoCompleteRouter');
var allUsersRouter = require('./routes/allUsersRouter');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter);
app.use('/adminLogin',adminLoginRouter);
app.use('/adminPanel',adminPanelRouter);
app.use('/register',registerRouter);
app.use("/userRegister", userRegisterRouter);
app.use("/adminRegister", adminRegisterRouter);
app.use("/userInfo", userInfoRouter);
app.use("/login", loginRouter);
app.use("/loginPost", loginPostRouter);
app.use("/logout", logoutRouter);
app.use("/userInfoComplete", userInfoCompleteRouter);
app.use("/allUsers", allUsersRouter);











// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
