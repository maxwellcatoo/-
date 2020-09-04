var express = require('express');
var router = express.Router();

/* 后台医生页. */
router.get('/', function(req, res, next) {
  res.send('后台医生页')
});

module.exports = router;
