const express = require('express');
const carflow = require('./carflow');
const user = require('./user');
const device = require('./device');

const router = express.Router();


router.use('/carflow', carflow);

router.use('/user',user);

router.use('/device', device);

module.exports = router;
