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
    var dName = req.body.dName;
    var donatedMoney = parseInt(req.body.donatedMoney);
    console.log(dName);
    var connection = new Db().conntect();
    connection.connect();
    var sql = "SELECT * FROM donation WHERE donationName" + "=?";
    var sqlVal = [dName];
    connection.query(sql,sqlVal,function(err, result){
        if(err){
            throw err;
        }

        //console.log(JSON.stringify(result));

        var donationAmount = parseInt(result[0].donationAmount);
        var currentAmount = result[0].currentAmount;
        currentAmount = parseInt(currentAmount);
        if(currentAmount >= donationAmount){
            //捐赠已完成 停止捐赠
            var data = {
                code:2
            }
            res.send(data);
        } else {
            currentAmount = currentAmount + donatedMoney;
            currentAmount = currentAmount + "";
            var sql = "UPDATE donation SET currentAmount" + "=?" + "WHERE donationName" + "=?"
            var sqlVal = [currentAmount,dName];
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