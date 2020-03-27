var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    var sessionData = req.session.adminData;
    console.log(sessionData);
    if(!sessionData){
        //没登录
        res.redirect("http://47.107.184.56:3000/admin");
    }else{
        var adminType = sessionData.adminType;
        var acct = sessionData.acct;
        console.log(adminType);
        console.log(acct);
        res.render('adminPanel',{"adminName":acct});
    }

});

module.exports = router;

