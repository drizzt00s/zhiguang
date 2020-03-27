var express = require('express');
var router = express.Router();
var mysql = require('mysql');

function Db(){   

}

Db.prototype.conntect = function(){
    var connection = mysql.createConnection({
        host     : '47.107.184.56',
        user     : 'root',
        password : '5225541a!Asc234!',
        database : 'zhiguang',
        port:"3306",
        insecureAuth:true
    }); 
    return connection;
};

Db.prototype.crypto = function(){
    var crypto = require('crypto');
    return crypto.createHash('md5');
};

router.post("/", function(req, res, next){
    var acct = req.body.acct;
    var pwd = req.body.pwd;
    var md5 = new Db().crypto();
    var connection = new Db().conntect();
    connection.connect();
    var sql = "SELECT * From user WHERE acct" + "=?";
    var sqlValue = [acct];

    connection.query(sql,sqlValue,function(err, result){
        if(err){
            throw err;
        }
        if(result.length <= 0){
            var data = {
                code :0
            };
            res.send(data);
        } else {
            //账号存在 检查密码
            var s_pwd = result[0].pwd;
            var s_acct = result[0].acct;
            var passPwd = md5.update(pwd).digest('hex');
            if(s_pwd === passPwd){
                var data = {
                    code:2,
                    acct:s_acct
                };
                var userData = {"user_acct":s_acct};
                req.session.userData = userData;
                res.send(data);
            
            } else {
                //密码不正确
                var data = {
                    code :1
                };
                res.send(data);
            }
        }
    });




});

module.exports = router;
