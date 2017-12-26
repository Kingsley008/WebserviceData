const express = require('express');
const router = express.Router();
const Device = require('../../models/Device.js');

/**
 * 增加网关设备
 * **/
router.get('/add_device/:cross_id/:road_name/:longitude/:latitude', (req, res) => {
    const cross_id = req.params.cross_id;
    const road_name = req.params.road_name;
    const longitude = req.params.longitude;
    const latitude = req.params.latitude;
    const _Device = {
        cross_id: cross_id,
        road_name: road_name,
        longitude: longitude,
        latitude: latitude
    };
    const new_device = new Device(_Device);
    new_device.save((err, user) => {
        if (!err) {
            res.status(200).json({message: 'ok'})
        }
    })

});


/**
 *  删除网关设备
 * **/
router.get('/delete_device/:cross_id', (req, res) => {
    console.log(req.params.cross_id);
    Device.remove({cross_id: req.params.cross_id})
        .then((data) => {
            res.status(200).json({message: 'ok'})
        })
        .catch((err) => {
            console.log(err)
        })
});


/**
 *  修改网关设备
 * **/
router.get('/alter_device/:cross_id/:road_name/:longitude/:latitude', (req, res) => {
    const cross_id = req.params.cross_id;
    const road_name = req.params.road_name;
    const longitude = req.params.longitude;
    const latitude = req.params.latitude;

    Device.update({cross_id: cross_id},
        {$set: { cross_id: cross_id,road_name: road_name, longitude: longitude, latitude: latitude}})
        .then((data)=>{
            console.log(data);
            res.status(200).json({message:'ok'})
        })
        .catch((err) => {
            console.log(err)
        })
});


/**
 * 查找网关设备
 * **/
router.get('/get_device', (req,res) => {
    Device.find({},   '-_id -__v',)
        .then((data)=>{
            res.status(200).json({list:data})
        })
});


/**
 * 根据cross_id 查询路口名称
 * **/

router.get('/get_device_name/:cross_id', (req,res) => {
   Device.findOne({cross_id:req.params.cross_id})
       .then((ret)=>{
            return res.status(200).json(ret)
       })
});

module.exports = router;
