const mongoose = require('mongoose');

const { Schema } = mongoose;

const DeviceSchema = new Schema({
    cross_id:{
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    road_name: {
        type: String,
        required: true,
        trim: true,
    },
    latitude:Number,
    longitude:Number,
},
    { collection: 'devices'},
);

const Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;
