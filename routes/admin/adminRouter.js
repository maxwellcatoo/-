var express = require('express');
var router = express.Router();

var doctorRouter = require('./doctorRouter')
var newsRouter = require('./newsRouter')
var patientRouter = require('./patientRouter')
var userRouter = require('./userRouter')

function permisson(req,res,next) {
    // console.log(req.session)
    if(req.session.username === undefined) {
        res.redirect('/rl/login')
    }else {
        next()
    }
} 

/* 后台管理的首页 */
router.get('/', permisson,function(req, res) {
    res.render('admin/admin.ejs',{
        'username': req.session.username,
    })
});



/* 后台管理的新闻页 */
router.use('/news',newsRouter)
/* 后台管理医生页 */
router.use('/doctor',doctorRouter)
/* 后台管理病人页 */
router.use('/patient',patientRouter)
/* 后台管理页面 */
router.use('/user',userRouter)



module.exports = router;
