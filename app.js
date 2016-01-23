var express = require('express');
var path = require('path');//处理路径
var favicon = require('serve-favicon');//处理收藏夹图标
var logger = require('morgan');//日志
var cookieParser = require('cookie-parser');//解析cookie
var bodyParser = require('body-parser');//解析请求体，存储到 req.body

//实现session保存到数据库
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

var routes = require('./routes/index');//主页Router 路由
var users = require('./routes/users');//用户Router 路由
var goods = require('./routes/goods');//用户Router 路由

var app = express();//app实际是一个中间件函数

// view engine setup 设置模板
//app.set('views', path.join(__dirname, 'views'));//设置模板路径
// app.set('view engine', 'ejs');//设置模板引擎
app.set('views', path.join(__dirname, 'public'));//设置模板路径
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

//设置收藏夹图标  uncomment after placing your favicon in /public 
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));//输出日志 并设置日志格式
app.use(bodyParser.json());// 解析请求体 application/json
app.use(bodyParser.urlencoded({ extended: false }));// 解析请求体 application/urlencode
app.use(cookieParser());
//session中间件 向req添加属性session
app.use(session({
  secret:'shop',
  resave:true,
  saveUninitialized:true,
  cookie:{
    maxAge:60*60*1000
  },
  store:new mongoStore({
    url:'mongodb://localhost/shop'
  })
}));
//js css images等静态文件路径 
app.use(express.static(path.join(__dirname, 'public')));//设置静态文件中间件

app.use('/', routes);//当请求为/时，调用routes中间件
app.use('/users', users);//当请求为/users时，调用users中间件
app.use('/goods', goods);//当请求为/goods，调用goods中间件

//捕获404错误并转发到错误处理中间件 catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
//开发环境会暴露err信息，生产环境不会
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
