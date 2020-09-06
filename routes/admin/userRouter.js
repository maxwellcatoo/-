const express = require('express');
const fs = require('fs')

const router = express.Router();
const sqlQuery = require('../../public/module/lcMysql')
const mkdir = require('../../public/module/fs')

/* 后台用户管理. */
router.get('/', function(req, res, next) {
  res.send('后台用户管理')
});

//个人信息页
router.get('/info',async (req,res) => {
  // res.send('个人信息页')
  let username = req.session.username
  let sqlStr = "select * from user where username = ?"
  let result = await sqlQuery(sqlStr,[username])
  result = result[0]
  res.render('admin/info.ejs',{
    username: username,
    mobile: result.mobile,
    email: result.email,
    password: result.password
  })
})
router.post('/info',async (req,res) => {
  let username = req.session.username
  let newUsername = req.body.username
  let password = req.body.password
  let mobile = req.body.mobile
  let email = req.body.email
  let sqlStr = 'update user set username = ?,password = ?,email = ?,mobile = ? where username = ?'
  await sqlQuery(sqlStr,[newUsername,password,email,mobile,username])
  let tableUsername = await sqlQuery('select * from user where username = ?',[newUsername])
  if(tableUsername) {
    req.session.username = newUsername
  }
  res.redirect('/admin/news')
})

//axios请求
router.get('/axios',async (req,res) => {
  let relUsername = req.session.username
  let username = req.query.username
  console.log(username)
  let sqlStr = 'select * from user where username = ?'
  let result = await sqlQuery(sqlStr,[username])
  if(result.length !== 0 && username !== relUsername){  //不能注册的条件应为result长度不为0 且username与relUsername即axios传过来的用户名与当前用户名不相同时
    res.send(false)  //返回false表示不能注册
  }else{
    res.send(true)  //返回true表示可以注册
  }
})

router.get('/imgonload',async (req,res) => {
  console.log(req.files);
  let file = req.files.file;
  let imgPath=file.path;
  let name=file.name;
  const fileReader=fs.createReadStream(imgPath);// 创建一个文件读取流
  // 定义文件存储路径
  var fileDir=__dirname+'../../public/users'
  const filePath=`${fileDir}/${name}`; // 真正的项目中图片名字是随机生成的,防止重复
  //创建文件输出流
  const fileWrite=fs.createWriteStream(filePath);
  // 写入文件数据
  await fileReader.pipe(fileWrite);
  /* ctx.body={
      code:200,
      msg:'请求成功!'
  }; */
  // mkdir('../../public/users')
  res.send(true)
})

module.exports = router;
