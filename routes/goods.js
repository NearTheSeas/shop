var express = require('express');
var models = require('../models');
var router = express.Router();
var async = require('async');

//保存商品
router.post('/add', function (req, res) {
    var _id = req.body._id;
    //如果请求的对象有_id则为更新操作
    if(_id){
        models.Goods.update({_id:_id}, req.body, function (err, good) {
            if(err){
                console.log(err);
                res.json(500,{msg:err});
            }else{
                res.json(good);
            }
        });
    //    没有_id 则执行 添加操作
    }else{
        new models.Goods({name:req.body.name, imgSrc:req.body.imgSrc, price:req.body.price}).save(function (err, good) {
            if(err){
                console.log(err);
                res.json(500,{msg:err});
            }else{
                res.json(good);
            }
        });
    }

});
//查询所有商品列表
router.get('/list', function (req, res) {
    models.Goods.find({}, function (err,goods) {
        if(err){
            res.status(500).json({msg:err});
        }else{
            res.json(goods);
        }
    });
});
//删除指定商品
router.post('/delete', function (req, res) {
    models.Goods.remove({_id:req.body._id}, function (err,result) {
        if(err){
            res.status(500).json({msg:err});
        }else{
            res.json(result);
        }
    });
});
//批量删除
router.post('/batchDelete', function (req, res) {
    var _ids = req.body._ids;
    console.log(_ids);
    var tasks = [];
    _ids.forEach(function (_id) {
       tasks.push(function (callback) {
           models.Goods.remove({_id:_id},callback);
       })
    })
    async.parallel(tasks, function (err, result) {
        if(err){
            res.status(500).json({msg:err});
        }else{
            res.json(result);
        }
    })

});
module.exports = router;
