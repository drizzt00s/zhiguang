var express = require('express');
var router = express.Router();
var mysql = require('mysql');

function Db(){   

}

Db.prototype.conntect = function(){
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '5225541a',
        database : 'zhiguang'
    }); 
    return connection;
};

Db.prototype.crypto = function(){
    var crypto = require('crypto');
    return crypto.createHash('md5');
};

router.post("/", function(req, res, next){
    var acct = req.body.acct;//手机
    var pwd = req.body.pwd;
    var mail = req.body.mail;


    var md5 = new Db().crypto();
    var connection = new Db().conntect();
    connection.connect();
    var sql = 'INSERT INTO user (acct,pwd,mail) VALUES(?,?,?)';
    var pass = md5.update(pwd).digest('hex');
    var sqlValue = [acct,pass,mail];
    connection.query(sql,sqlValue,function(err, result){
        if(err){
            throw err;
        }
        var data = {
            code:"001"
        };
        console.log("insert ok");
        var userData = {"user_acct":acct};
        req.session.userData = userData;
        res.send(data);
    });
});

module.exports = router;