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
    var pjName = req.body.pjName;
    console.log(pjName);
    var connection = new Db().conntect();
    connection.connect();
    var sql = "SELECT * FROM project WHERE pj_name" + "=?";
    var sqlVal = [pjName];
    connection.query(sql,sqlVal,function(err, result){
        if(err){
            throw err;
        }
        //console.log(JSON.stringify(result));
        var pj_people = parseInt(result[0].pj_person);
        var currentPerson = result[0].personInUse;
        currentPerson = parseInt(currentPerson);
        if(pj_people === currentPerson){
            //人数已满
            var data = {
                code:2
            }
            res.send(data);
        } else {
            currentPerson = currentPerson + 1;
            currentPerson = currentPerson + "";
            var sql = "UPDATE project SET personInUse" + "=?" + "WHERE pj_name" + "=?"
            var sqlVal = [currentPerson,pjName];
            connection.query(sql, sqlVal, function(err, result){
                if(err){
                    throw err;
                }
                var data = {
                    code:1
                }
                res.send(data);
            });
        }
        //console.log(JSON.stringify(result));
    });


});


module.exports = router;