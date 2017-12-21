const express = require('express');
const router = express.Router();
const User = require('../../models/User.js');

/**
 *  校对账号密码
 *
 * **/
router.get('/login/account/:userName/:password', (req, res)=> {
    const userName = req.params.userName;
    const password = req.params.password;
    User.findOne({username: userName})
        .then((ret) => {
            let  result = false;
            console.log(ret);
            if(ret != null){
                if(password === ret.password){
                    result = true;
                }
            }
            if(result){
                console.log('Cookies:', req.cookies);
                res.cookie('userName',req.params.userName);
                res.status(200).json({status:'ok', userName:req.params.userName})
            } else {
                res.status(200).json({status:'error'})
            }
        })
        .catch ((err)=>{
                res.status(200).json({err})
    })

});

router.get('/currentUser', (req, res)=> {

    const obj = {
        name: 'SeratiMa',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        notifyCount: 0,
    };

    res.status(200).json(obj)
});

module.exports = router;