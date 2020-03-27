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
    var projName = req.body.pj_name;
    var reqPerson = req.body.per_number;
    var date = new Date().toLocaleDateString();
    var connection = new Db().conntect();
    connection.connect();
    var sql = 'INSERT INTO project (pj_name,pj_person,date,personInUse) VALUES(?,?,?,?)';
    var sqlValue = [projName,reqPerson,date,0];
    connection.query(sql,sqlValue,function(err, result){
        if(err){
            throw err;
        }
        var data = {
            code:1
        };
        res.send(data);
    });
});

module.exports = router;