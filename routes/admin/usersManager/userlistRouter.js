var express = require('express');
const sqlQuery = require('../../../public/module/lcMysql');
const multer = require('multer')
const fs = require('fs')
var router = express.Router();

/* 用户列表1页. */
router.get('/list1', async (req, res) => {
  let page = req.query.page
  page = page?page:1;
  let sqlStrNum = 'select id from user'
  let sqlStr = 'select * from user limit ?,5'
  let resultNum = await sqlQuery(sqlStrNum)
  let result = await sqlQuery(sqlStr,[(page-1)*5])
  let userlist = Array.from(result)
  let options = {
    title: '用户列表1',
    numberCount: resultNum.length,
    userlist: userlist
  }
  res.render('admin/userlist',options)
});


// 用户列表2页
router.get('/list2', async (req, res) => {
  let page = req.query.page
  page = page?page:1;
  let sqlStrNum = 'select id from user'
  let sqlStr = 'select * from user limit ?,5'
  let resultNum = await sqlQuery(sqlStrNum)
  let result = await sqlQuery(sqlStr,[(page-1)*5])
  let userlist = Array.from(result)
  let options = {
    title: '用户列表1',
    numberCount: resultNum.length,
    userlist: userlist
  }
  res.render('admin/userlist',options)
});

//删除用户
router.get('/del',async (req,res) => {
  let arr = req.query.arr
  let sqlStr = 'DELETE from user where username = ? and roleid != 1'
  for(let i = 0;i<arr.length;i++){
    await sqlQuery(sqlStr,[arr[i]])
  }
  res.send(true)
})

//添加用户
  //加载页面
router.get('/add',(req,res) => {
  res.render('admin/userlistAdd')
})
  //页面提交
router.post('/add',multer({
  dest: './public/users'
}).single('file'),async (req,res) => {
  let filepath = ''
  if(!req.file){
    filepath = "users/default.jpg"
  }else{
    let file = req.file
    let userFile = './public/users/'+req.body.username
    fs.mkdir(userFile,(err,data) => {
      if(err){
        console.log(err)
      }else{
        // console.log(data)
      }
    })

    fs.renameSync('./public/users/'+file.filename,userFile+'/'+file.originalname)
    filepath = 'users/'+req.body.username+'/'+file.originalname
  }

  let username = req.body.username
  let password = req.body.password
  let mobile = req.body.mobile
  let email = req.body.email
  let sqlStr = 'insert into user (username,password,email,mobile,imgHead) values (?,?,?,?,?)'
  await sqlQuery(sqlStr,[username,password,email,mobile,filepath])
  res.send('添加用户成功')
})

  //用户管理页面axios请求删除用户
router.post('/delet',async (req,res) => {
  let id = req.body.id
  console.log(id)
  let sqlStr = 'DELETE from user where id = ? and roleid != 1'
  let result = await sqlQuery(sqlStr,[id])
  if(result) {
    res.send(true)
  }else{
    res.send(false)
  }
})

  //用户管理页面编辑用户信息
let id
router.post('/editcross',(req,res) => {
  id = req.body.id
  if(id){
    res.send(true)
  }else{
    res.send(false)
  }
})

    //进入到编辑页面时，从数据库表查询所查询角色的信息
router.get('/edit',async (req,res) => {
  let sqlStr = "select * from user where id = ?"
  let result = await sqlQuery(sqlStr,[id])
  result = result[0]
  let imgSrc = ''
  if(!result.imgHead){
    imgSrc = 'users/default.jpg'
  }else{
    imgSrc = result.imgHead
  }
  res.render('admin/userlistEdit.ejs',{
    username: result.username,
    mobile: result.mobile,
    email: result.email,
    password: result.password,
    imgSrc: imgSrc
  })
})
    //提交修改的用户信息，在数据库中进行更新
    //用户头像的修改还利用之前的Info的axios请求路由进行修改
router.post('/edit',async (req,res) => {
  let username = req.body.username
  let password = req.body.password
  let mobile = req.body.mobile
  let email = req.body.email
  let sqlStr = 'update user set username = ?,password = ?,email = ?,mobile = ? where id = ?'
  await sqlQuery(sqlStr,[username,password,email,mobile,id])
  res.send('修改成功')
})

//个人信息修改时查询所修改的用户名是否已被注册的axios请求
router.get('/axios',async (req,res) => {
  let username = req.query.username
  console.log(username)
  let sqlStr = 'select id from user where username = ?'
  let result = await sqlQuery(sqlStr,[username])
  if(result.length !== 0){  //不能注册的条件应为result长度不为0 且username与relUsername即axios传过来的用户名与当前用户名不相同时
    res.send(false)  //返回false表示不能注册
  }else{
    res.send(true)  //返回true表示可以注册
  }
})

/* router.post('/imgOnload',multer({
  dest: './public/users/'
}).single('file'),async (req,res,next) => {
  if(!req.file) {
    res.send('上传文件不能为空！')
    return
  }else{
    // fs.appendFile('')
    let userFile = './public/users/'+req.session.username
    let filepath=''
    fs.mkdir(userFile,(err,data) => { //创建文件夹
      if(err){
        console.log(err)
      }
    })
    let file = req.file;
    let fileInfo = {}
    // console.log(file)
    // console.log(file.filename)
    //写入文件成功
    fs.renameSync('./public/users/'+file.filename,userFile+'/'+file.originalname)
    //把文件路径更新到数据库中
    fileInfo.mimetype = file.mimetype
    fileInfo.size = file.size
    fileInfo.path = file.path
    filepath = 'users/'+req.session.username+'/'+file.originalname
    let sqlStr = 'update user set imgHead=? where username = ?'
    await sqlQuery(sqlStr,[filepath,req.session.username])

    //设置响应类型及编码
    res.set({
      'content-type': 'application/json; charset=utf-8'
    })
    // res.json({
    //   state:'ok',
    //   imgUrl: filepath
    // })
    res.render('修改成功')
  }
}) */

module.exports = router;
