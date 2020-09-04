var express = require('express');
var router = express.Router();

/* 后台病人页. */
router.get('/', function(req, res, next) {
  res.send('后台病人页')
});

module.exports = router;
