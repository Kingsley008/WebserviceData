const express = require('express');
const carflow = require('./carflow');
const user = require('./user');

const router = express.Router();

router.use('/carflow', carflow);
router.use('/user',user);

module.exports = router;
