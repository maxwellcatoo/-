
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
// var mysql = require('mysql')

var adminRouter = require('./routes/admin/adminRouter')
var loginRouter = require('./routes/login/loginRouter')

var app = express();
//session设置
app.use(session({
  secret: 'aoteman',
  resave: true, //强制保存session
  cookie: {
    maxAge: 7*24*60*60*1000,//设置session有效期为1周
  },
  saveUninitialized: true //是否保存初始化的session
}))
// 连接数据库
/* let options = {
  host: "localhost",
  port: "3306",//可不写，不写的话默认是3306
  user: "root",
  password: "123456",
  database: "hospitalms"
}

let con = mysql.createConnection(options)
con.connect(err => {
  if(err){
    console.log('数据库连接失败')
  }else{
    console.log('数据库连接成功')
  }
}) */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//主页
app.get('/',(req,res) => {
  res.send('这是首页')
})
//注册后台管理页面路由
app.use('/admin',adminRouter);


// 注册登录页
app.use('/rl',loginRouter)


// app.use('/iframe',(req,res) => {
//   res.render('iframe.ejs',{
//     title: 'iframe学习页'
//   })
// })


module.exports = app;
