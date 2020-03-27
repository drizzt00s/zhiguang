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

router.post("/", function(req, res, next){
    var acct = req.body.acct;
    var connection = new Db().conntect();
    connection.connect();
    var sql  = "UPDATE user SET certificate_status" + "=?" + "WHERE acct" + "=?" ;
    var sqlValue =  ["实名认证失败", acct];
    connection.query(sql,sqlValue,function(err, result){
        if(err){
            throw err;
        }
        var data = {
            code:1
        }
        res.send(data);
    });

});


module.exports = router;