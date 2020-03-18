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

router.get("/", function(req, res, next){
    var connection = new Db().conntect();
    connection.connect();
    var sql = "SELECT * FROM project";
    connection.query(sql, function(err, result){
        if(err){
            throw err;
        }
        res.send(result);
    });


});

module.exports = router;