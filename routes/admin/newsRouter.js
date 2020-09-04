var express = require('express');
var router = express.Router();

/* 后台新闻编辑页管理. */
router.get('/', function(req, res, next) {
  res.send('后台新闻编辑页管理')
});

module.exports = router;
