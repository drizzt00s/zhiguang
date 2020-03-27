var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require("fs");
var path = require("path");


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
    var userData = req.session.userData;
    if(!userData){
        throw new Error("用户没登录");
    }else{
        var acct = req.session.userData.user_acct;
        if (fs.existsSync(path.join(__dirname, '../public/upload/' + acct + "/"))) {
            //用户已经上传过身份证和个人相片
            var flag2 = 0;
            var fstream;
            req.pipe(req.busboy);
            req.busboy.on('file', function (fieldname, file, filename) {
                if(fieldname === "idCard1"){
                    //身份证正面照
                    var id_photo1 = path.join(__dirname, '../public/upload/' + acct + "/") + filename;
                }else if(fieldname === "idCard2"){
                    var id_photo2 = path.join(__dirname, '../public/upload/' + acct + "/") + filename;
                }else if(fieldname === "photo"){
                    var photo = path.join(__dirname, '../public/upload/' + acct + "/") + filename;
                }
                fstream = fs.createWriteStream(path.join(__dirname, '../public/upload/' + acct + "/" ) + filename);
                file.pipe(fstream);
                fstream.on('close', function () {
                    var connection = new Db().conntect();
                    connection.connect();
                    //UPDATE T_Person SET FAge = 12 WHERE FNAME="Tom"
                    if(id_photo1){
                        //var sql = "UPDATE user SET id_photo1=" + "'" + id_photo1 + "'"   + " WHERE acct=" + "'" + acct + "'";
                        var sql = "UPDATE user SET id_photo1" + "=?" + " WHERE acct" + "=?";
                        var sqlValue = [id_photo1, acct];
                    }else if(id_photo2){
                        var sql = "UPDATE user SET id_photo2" + "=?" + " WHERE acct" + "=?";
                        var sqlValue = [id_photo2, acct];
                    }else if(photo){
                        var sql = "UPDATE user SET photo" + "=?" + " WHERE acct" + "=?";
                        var sqlValue = [photo, acct];
                    }
                    connection.query(sql,sqlValue,function(err, result){
                        if(err){
                            throw error;
                        }
                        flag2++;
                        if(flag2 === 3){
                            var sql = "UPDATE user SET certificate_status" + "=?" + " WHERE acct" + "=?";
                            var sqlValue = ["实名认证待审核", acct];
                            connection.query(sql,sqlValue,function(err, result){
                                if(err){
                                    throw err;
                                }
                                res.redirect("/userInfo");
                            });
                        }
                    });

                });
            });
        }else{
            var flag = 0;
             //用户没有上传过身份证和个人相片
             fs.mkdir(path.join(__dirname, '../public/upload/' + acct + "/"), 0777, function(err){
                if(err){
                    console.log(err);
                }else{
                    var fstream;
                    req.pipe(req.busboy);
                    req.busboy.on('file', function (fieldname, file, filename) {
                        if(fieldname === "idCard1"){
                            //身份证正面照
                            var id_photo1 = path.join(__dirname, '../public/upload/' + acct + "/") + filename;
                        }else if(fieldname === "idCard2"){
                            var id_photo2 = path.join(__dirname, '../public/upload/' + acct + "/") + filename;
                        }else if(fieldname === "photo"){
                            var photo = path.join(__dirname, '../public/upload/' + acct + "/") + filename;
                        }
                        fstream = fs.createWriteStream(path.join(__dirname, '../public/upload/' + acct + "/" ) + filename);
                        file.pipe(fstream);
                        fstream.on('close', function () {
                           
                            var connection = new Db().conntect();
                            connection.connect();
                            //UPDATE T_Person SET FAge = 12 WHERE FNAME="Tom"
                            if(id_photo1){
                                //var sql = "UPDATE user SET id_photo1=" + "'" + id_photo1 + "'"   + " WHERE acct=" + "'" + acct + "'";
                                var sql = "UPDATE user SET id_photo1" + "=?" + " WHERE acct" + "=?";
                                var sqlValue = [id_photo1, acct];
                            }else if(id_photo2){
                                var sql = "UPDATE user SET id_photo2" + "=?" + " WHERE acct" + "=?";
                                var sqlValue = [id_photo2, acct];
                            }else if(photo){
                                var sql = "UPDATE user SET photo" + "=?" + " WHERE acct" + "=?";
                                var sqlValue = [photo, acct];
                            }
                            connection.query(sql,sqlValue,function(err, result){
                                if(err){
                                    throw error;
                                }
                                flag++;
                                if(flag === 3){
                                    var sql = "UPDATE user SET certificate_status" + "=?" + " WHERE acct" + "=?";
                                    var sqlValue = ["实名认证待审核", acct];
                                    connection.query(sql,sqlValue,function(err, result){
                                        if(err){
                                            throw err;
                                        }
                                        res.redirect("/userInfo");
                                    });
                                }
                            });
                        });
                    });
                }
            })
        }
    }


});

module.exports = router;