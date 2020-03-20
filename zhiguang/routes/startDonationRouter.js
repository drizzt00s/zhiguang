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


router.post("/", function(req, res, next){

    var pjName = req.body.name;
    var expectedAmount = req.body.expectedAmount;
    var date = new Date().toLocaleDateString();
    var connection = new Db().conntect();
    connection.connect();

    var sql = 'INSERT INTO donation (donationName,donationAmount,date,currentAmount) VALUES(?,?,?,?)';
    var sqlValue = [pjName,expectedAmount,date,0];
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