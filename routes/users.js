var express = require('express');
var models = require('../models');
var router = express.Router();
var crypto = require('crypto');

/* GET users listing. */
function encrypto(compent){
  var md5 = crypto.createHash('md5');
  return md5.update(compent).digest('hex');
}
//验证是否登录
router.post('/validate', function (req,res) {
  var userId = req.session.userId;
  console.log(userId);
  if(userId){
    models.User.findOne({_id:userId}, function (err,user) {
      if(err){
        res.status(401).json({msg:err});
      }else{
        console.log(user);
        res.json(user);
      }
    })
  }else{
    res.status(401).json({msg:'用户未登陆'});
  }
});
//退出事件
router.post('/logout', function (req, res) {
  req.session.userId = null;
  res.json({msg:'退出成功'});
});
//注册事件
router.post('/reg', function (req, res) {
  var user = req.body;
  var md5Email = encrypto(user.email);
  var avatar = "https://secure.gravatar.com/avatar/"+md5Email+"?s=48";
  //if(user.password  != user.repassword){
  //
  //}
  var regUser = {username:user.username,password:encrypto(user.password),email:user.email,avatar:avatar };
  new models.User(regUser).save(function (err, result) {
    if(err){
      console.log(err);
      res.json(500,{msg:err});
    }else{
      res.json(result);
    }
  });
});
//登陆事件
router.post('/login', function (req, res) {
  var user = req.body;
  console.log(encrypto(user.password));
  models.User.findOne({username:user.username,password:encrypto(user.password)}, function (err,user){
    if(err){
      res.status(500).json({msg:err});
    }else{
      if(user){
        req.session.userId = user._id;
        res.json(user);
      }else {
        res.status(401).json({msg:'此用户不合法！'});
      }
    }
  });
});

module.exports = router;
