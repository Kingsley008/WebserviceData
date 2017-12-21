const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
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


const User = mongoose.model('User', UserSchema);

module.exports = User;