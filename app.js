const express = require('express');
const bodyParser = require('body-parser');
const xmlparser = require('express-xml-bodyparser');
const routedata = require('./routes/routedata');
const cookieParser = require('cookie-parser');
const mongoose = require('./db/mongodb');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));



/**
 * 设置静态资源路径
 * **/

// app.all('/*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', '*');
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Content-Type", "application/json;charset=utf-8");
//     res.header("Access-Control-Allow-Headers", "Content-Type,Access-Token");
//     res.header("Access-Control-Allow-Credentials","true");
//
//     if (req.method === "OPTIONS") {
//         res.status(200).json('ok');
//         return;
//     }
//     next();
// });


app.use(bodyParser.json());

app.use(cookieParser());

const v1 = require('./routes/v1/index');

app.use('/api/method=get&appkey=436etaq52e57a3cd028ab56b&seckey=sec-mj12Slu12w1Xs1er8ZzmGZqw5qrpFmqw25jHULr13eUZCswA/v1', v1);

app.use('/*', express.static(path.join(__dirname, 'public', "index.html")));

app.use((req, res, next) => {
    res.status(404).json({code:404})
});



module.exports = app;