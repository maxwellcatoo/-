var express = require('express');
const sqlQuery = require('../../../public/module/lcMysql');
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
router.get('/list2',async (req,res) => {
  let sqlStr = 'select * from user where username = ?'
  let result = await sqlQuery(sqlStr,[req.session.username])
  let options = {
    title: '用户列表2',
    numberCount: result.length
  }
  res.render('admin/userlist',options)
})


router.get('/del',async (req,res) => {
  let arr = req.query.arr
  let sqlStr = 'DELETE from user where username = ? and roleid != 1'
  for(let i = 0;i<arr.length;i++){
    await sqlQuery(sqlStr,[arr[i]])
  }
  res.send(true)
})
module.exports = router;
