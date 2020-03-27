var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var data = [
    {   QQ:"3234234",
        dateOfMissing:"2015-8-1",
        placeOfMissing:"江苏南京",
        specificLocation:"南京雨花台",
        msg:"寻人启事，三十三岁，二零一九年五月九号出走​‌‌，请各位好心人帮帮忙，如果看到请联系我，我老婆至今为回家，家里有小孩和老人在担心她。希望孩子能见上妈妈一面。如果海霞你本人看到次信息，请联系我我和孩子想你了。海霞为了孩子回来吧！请各位好心人知情者告知比有重谢！"
    },
    {   QQ:"345125",
    dateOfMissing:"2014-1-11",
    placeOfMissing:"江苏南京",
    specificLocation:"南京火车站",
    msg:"找去年曾经在嘉定区马陆镇仓场学校教书的江苏省泗洪县​‌‌王莹老师，我也是南京人有事相求请你帮忙。如果别人或者和她相识的人看到请转告她有人找她。能提供她联系方式最好。谢谢"
    },    
    {   QQ:"1346231",
    dateOfMissing:"2005-8-11",
    placeOfMissing:"江苏徐州",
    specificLocation:"徐州广厦路",
    msg:"江苏省徐州平凉庄浪水洛李庄人，于今​‌‌年3月份从徐州广厦路失踪，后经多方打听与庆阳西峰的一流氓名叫韩飞又叫李韩扬的人在一起，因文小燕与本人有经济来往，本人急于找到，可这一双用下身交流的动物躲避不显身，如有知道的朋友请留言，本人一定重谢"
    },    
    {   QQ:"567562",
    dateOfMissing:"2018-6-6",
    placeOfMissing:"山东菏泽",
    specificLocation:"菏泽制造三厂",
    msg:"山东菏泽，30岁，医美公司工作，居住于上​‌‌海徐汇区，养有小型犬，于2019年11月30日失联，*后条信息为“刚忙完”，之后两个电话号码均是停机关机，社交聊天app显示*后登陆时间11月30日。"
    },    
    {   QQ:"7456456",
    dateOfMissing:"2017-9-12",
    placeOfMissing:"山西",
    specificLocation:"山西南安",
    msg:"于2016年前往上海工作，至今仍处于失联状态​‌‌，希望有见过与我联系，必将重金酬谢"
    }
  ];

  var missingId = parseInt(req.query.id);
  console.log(missingId);

  res.render('missingPl', data[missingId]);
});

module.exports = router;