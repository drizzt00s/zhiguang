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

router.get("/", function(req, res, next){
    var connection = new Db().conntect();
    connection.connect();
    var sql = "SELECT * FROM user";
    connection.query(sql,function(err, result){
        if(err){
            throw err;
        }
        res.send(result);
    });
});

module.exports = router;