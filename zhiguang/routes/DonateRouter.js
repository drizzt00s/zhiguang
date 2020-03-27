var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var userData = req.session.userData;
    if(!userData){
        //用户未登录
        res.render('Donate',{user:""});
      }else{
        //用户已登录
        var user = userData.user_acct;
        res.render('Donate', {user:user});
      }
});

module.exports = router;