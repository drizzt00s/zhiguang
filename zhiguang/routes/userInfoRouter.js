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


router.get('/', function(req, res, next) {
    var userData = req.session.userData;
    if(!userData){
        //用户未登录
        res.redirect("/");
    }else{
        //用户已登录
        var user = userData.user_acct;
        var md5 = new Db().crypto();
        var connection = new Db().conntect();
        connection.connect();
        var sql = "SELECT * From user WHERE acct" + "=?";
        var sqlValue = [user];
        connection.query(sql,sqlValue,function(err, result){
            if(err){
                throw err;
            }
            //console.log(JSON.stringify(result));
            var result = result[0];
            var acct = result.acct;
            var mail = result.mail;
            var photo = result.photo;
            var birthday = result.birthday;
            var idPhoto1 = result.id_photo1;
            var idPhoto2 = result.id_photo2;
            var certificated = result.certificated;
            var certificate_status = result.certificate_status;
            

            // if(certificated === 0 || certificated === null){
            //     //未实名认证
            //      certificated = "身份待管理员审核,提交身份证正反面照和个人照片有助于实名认证";
            // } else if(certificated === 1){
            //     //已实名认证
            //      certificated = "已实名认证";
            // }
            
            if(!idPhoto1){
                idPhoto1 = "未上传";
            }else{
                var index = idPhoto1.indexOf("upload");
                idPhoto1 = idPhoto1.substring(index - 1);
                idPhoto1 = idPhoto1.replace(/\\/g,"/");
            }
            if(!idPhoto2){
                idPhoto2 = "未上传";
            }else{
                var index = idPhoto2.indexOf("upload");
                idPhoto2 = idPhoto2.substring(index - 1);
                idPhoto2 = idPhoto2.replace(/\\/g,"/");
            }
            if(!mail){
                mail = "邮箱未填写";
            }
            if(!photo){
                photo = "未上传";
            }else{
                var index = photo.indexOf("upload");
                photo = photo.substring(index - 1);
                photo = photo.replace(/\\/g,"/");
            }
            if(!birthday){
                birthday = "未填写";
            }
            res.render('userInfo',{
                certificate_status:certificate_status,
                idPhoto1:idPhoto1,
                idPhoto2:idPhoto2,
                mail:mail,
                photo:photo,
                birthday:birthday
            });
        });

        
    }




});

module.exports = router;