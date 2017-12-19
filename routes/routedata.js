var express = require('express');
var o2x = require('object-to-xml');
var jsontoxml = require('jsontoxml');
var router = express.Router();
var CarFlow = require('../models/Flow.js');

router.use((req, res, next) => {
    console.log('Source IP: ' + req.ip + ' at ' + new Date().toString());
    next();
});

router.get('/', (req, res) => {
    res.set('Content-Type', 'text/xml');
    res.send(
        o2x({
            '?xml version="1.0" encoding="utf-8"?': null,
            Root: {
                Status: 200
            }
        })
    );
});

/**
 * 返回所有的数据
 * **/
router.get('/all', (req, res) => {
    CarFlow.findAll((err, obj) => {
        res.status(200).send(obj);
    });
});

router.get('/near', (req, res) => {
    CarFlow.findNear((err, obj) => {
        res.status(200).send(obj);
    });
});

/**
 * 返回某一个cross id 的所有数据
 * **/

router.get('/cross/:id', (req, res) => {
    CarFlow.findByCross(req.params.id, (err, obj) => {
        res.status(200).send(obj);
    });
});

/**
 *  返回某一个 cross id 车道的信息
 * **/
router.get('/cross/:id/lane/:no', (req, res) => {
    CarFlow.findByCrossByLaneNo(req.params.id, req.params.no, (err, obj) => {
        res.status(200).send(obj);
    });
});

/**
 *  开时间 + 结束时间  查询
 * **/

router.get('/start=:timestart&end=:timeend', (req, res) => {
    CarFlow.findByPeriod(req.params.timestart, req.params.timeend, (err, obj) => {
        res.status(200).send(obj);
    });
});

/**
 *  查询某个 cross id  某段时间的数据
 * **/
router.get('/cross/:id/start=:timestart&end=:timeend', (req, res) => {
    CarFlow.findByCrossByPeriod(
        req.params.id,
        req.params.timestart,
        req.params.timeend,
        (err, obj) => {
            res.status(200).send(obj);
        }
    );
});

/**
 *  返回一个具体 cross id
 * **/
router.get(
    '/cross/:id/lane/lanestart=:lanest&laneend=:laneen/start=:timestart&end=:timeend',
    (req, res) => {
        const row_count = CarFlow.findByCrossByLaneRangeByPeriodTotalPages(
            req.params.id,
            req.params.lanest,
            req.params.laneen,
            req.params.timestart,
            req.params.timeend,
            (total_count) => {
                CarFlow.findByCrossByLaneRangeByPeriod(
                    req.params.id,
                    req.params.lanest,
                    req.params.laneen,
                    req.params.timestart,
                    req.params.timeend,
                    (err, obj) => {
                        obj.push({total_count: total_count});
                        res.status(200).json(obj);
                    }
                );
            }
        );



    }
);


router.get('/cross/:id/last3min', (req, res) => {
    CarFlow.findByCrossNear3min(req.params.id, (err, obj) => {
        res.status(200).send(obj);
    });
});

router.get('/last/:n', (req, res) => {
    CarFlow.findLastN(req.params.n, (err, obj) => {
        res.status(200).json(obj);
    });
});


/**
 *  查询 某个cross-id 下 某个车道 倒数的几条数据
 * **/
router.get('/cross/:id/lane/:no/last/:n', (req, res) => {
    console.log('fetch');
    CarFlow.findByCrossByLaneLastN(
        req.params.id,
        req.params.no,
        req.params.n,
        (err, obj) => {
            res.status(200).json(obj);
        }
    );
});


router.get('/allcrossid', (req, res) => {

    CarFlow.findAllCrossId(
        (err, obj) => {
            res.status(200).json(obj);
        }
    );
});

router.get('/getlane/:id', (req, res) => {
    console.log(req.params.id);
    CarFlow.findLaneByCrossId(req.params.id, (err, obj) => {
        res.status(200).json(obj);
    })
});

module.exports = router;
