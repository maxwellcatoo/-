var express = require('express');
var router = express.Router();

/* 后台用户管理. */
router.get('/', function(req, res, next) {
  res.send('后台用户管理')
});

//个人信息页
router.get('/info',(req,res) => {
  res.send('个人信息页')
})

module.exports = router;
