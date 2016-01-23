var express = require('express');
var models = require('../models');
var router = express.Router();
var crypto = require('crypto'); //加密

/* GET users listing. */
//加密compent 并返回加密后的结果
function encrypto(compent){
  var md5 = crypto.createHash('md5');
  return md5.update(compent).digest('hex');
}
//验证是否已登录
router.post('/validate', function (req,res) {
  //获取session中的用户id
  var userId = req.session.userId;
  console.log(userId);
  //session中存在userid
  if(userId){
    //到数据库中查找是否有对应的用户
    models.User.findOne({_id:userId}, function (err,user) {
      if(err){
        res.status(401).json({msg:err});
      }else{
        res.json(user);
      }
    })
  }else{
    res.status(401).json({msg:'用户未登陆'});
  }
});
//登陆请求
router.post('/login', function (req, res) {
  //获取请求表单中的用户
  var user = req.body;
  //到数据库中查找对应用户
  models.User.findOne({username:user.username,password:encrypto(user.password)}, function (err,user){
    if(err){
      res.status(500).json({msg:err});
    }else{
      if(user){
        req.session.userId = user._id;
        res.json(user);
      }else {
        res.status(401).json({msg:'用户名或密码错误！'});
      }
    }
  });
});
//退出登录请求
router.post('/logout', function (req, res) {
  //退出登录 清空session中的用户ID
  req.session.userId = null;
  res.json({msg:'退出成功'});
});
//注册事件
router.post('/reg', function (req, res) {
  //获取请求表单中的用户
  var user = req.body;
  //加密邮箱
  var md5Email = encrypto(user.email);
  var avatar = "https://secure.gravatar.com/avatar/"+md5Email+"?s=48";
  //if(user.password  != user.repassword){
  //逻辑验证待完善
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

module.exports = router;
