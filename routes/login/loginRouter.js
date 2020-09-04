var express = require('express');
var router = express.Router();
let sqlQuery = require('../../public/module/lcMysql')

/* 注册登录页. */
router.get('/register',(req,res) => {
  res.render('login/register.ejs',{
    title: '注册页面',
    content: '医院管理系统注册页',
    loginType: '注册'
  })
})
router.post('/register',async (req,res) => {
  let username = req.body.username
  let password = req.body.password
  let sqlStr = 'insert into user (username,password,roleid) values (?,?,1)'
  await sqlQuery(sqlStr,[username,password])
  console.log('注册成功')
  // let result = await sqlQuery(sqlStr,[username])
  // if(result.length === 0){
  //   console.log('该用户不存在，可以注册')
  //   // let sqlStrInsert = 'insert'
  // }else{
  //   console.log('该用户已存在')
  //   res.send('该用户已存在')
  // }
})


router.get('/login', function(req, res) {
  req.session.destroy()
  res.render('login/login.ejs',{
    title: '管理员登录',
    content: '医院管理系统登录页',
    loginType: '登录',
  })
});


router.post('/login',async (req,res) => {
  let username = req.body.username
  let password = req.body.password
  // console.log(username,password)
  let sqlStr = 'select * from user where username = ? and password = ?'
  let result = await sqlQuery(sqlStr,[username,password])
  if(result.length !== 0) {
    req.session.username = username
    res.redirect('/admin')
  }else{
    // req.session.username = undefined
    res.redirect('/rl/login')
  }
})

module.exports = router;
