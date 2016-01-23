/**
 * Created by 文龙 on 2016/1/22.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shop');
exports.User = mongoose.model('User',new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
}));
exports.Goods = mongoose.model('Goods',new mongoose.Schema({
    name:String,
    imgSrc:String,
    price:Number
}));