// const express = require('express');
// const o2x = require('object-to-xml');
// const jsontoxml = require('jsontoxml');
// const router = express.Router();
// const CarFlow = require('../models/Flow.js');
// const User = require('../models/User.js');
//
//
// /**
//  *  user 相关 API
//  *  -----------------------------------------------------------
//  * **/
//
//
// /**
//  *  校对账号密码
//  *
//  * **/
// router.get('/login/account/:userName/:password', (req, res)=> {
//
//         User.checkAccount(req.params.userName,req.params.password, (ret)=>{
//             if(ret){
//                 console.log('Cookies:', req.cookies);
//                 res.cookie('userName',req.params.userName);
//                 res.status(200).json({status:'ok', userName:req.params.userName})
//             }else{
//                 res.status(200).json({status:'error'})
//             }
//         })
// });
//
// router.get('/currentUser', (req, res)=> {
//
//     const obj = {
//         name: 'SeratiMa',
//         avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
//         userid: '00000001',
//         notifyCount: 0,
//     };
//
//     res.status(200).json(obj)
// });


// module.exports = router;

