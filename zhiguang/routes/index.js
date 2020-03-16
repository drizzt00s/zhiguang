var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var userData = req.session.userData;
  console.log(userData);
  if(!userData){
    //用户未登录
    res.render('index',{user:""});
  }else{
    //用户已登录
    var user = userData.user_acct;
    res.render('index', {user:user});
  }






});

module.exports = router;
