'use strict'
var mongodb = require('./mongodb');
var Schema =  mongodb.mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
        username: {
            type: String,
            index: { unique: true },
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        userId: String,
        userLevel: Number,//Normal: 1 Super: 2
        avatar: {type: String, default: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'},
        city: String,
        district: String,
        road: String,
        notifyCount:{type: Number, default:0}
},
    { collection: 'users' }
);
UserSchema.plugin(passportLocalMongoose);

var UserModel = mongodb.mongoose.model('user',UserSchema);

//operations
var UserOp = function(){};


//function save
UserOp.prototype.save = function(obj,callback){
    var instance = new UserModel(obj);
    instance.save(function(err){
        callback(err);
    })
};

UserOp.prototype.checkAccount = (username, password, callback) =>{
    UserModel.findOne({username:username})
        .then((ret) => {
            let  result = false;
            if(ret != null){
                if(ret.password === password){
                    result = true;
                }
            }
            callback(result)
        })
};

UserOp.prototype.getCurrent = (userName,callback)=>{
    UserModel.findOne({username:userName})
        .then((ret) => {
            callback(ret)
        })
};


module.exports = new UserOp();