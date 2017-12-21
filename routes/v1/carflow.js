const express = require('express');
const o2x = require('object-to-xml');
const jsontoxml = require('jsontoxml');
const moment = require('moment');
const router = express.Router();
const timeUtil  = require('../../utils/time');
const CarFlow = require('../../models/Flow');


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
    CarFlow.find({}, '-_id -__v', (err, data_all) => {
        if (err) {
            const message = {message: '数据库查询错误', err: err};
            res.status(200).json(message)
        }
        data_all = JSON.stringify({data_all});
        res.status(200).json(data_all);
    });
});

router.get('/near', (req, res) => {
    const today = moment().startOf('day');
    const week_ago = moment(today).subtract(7, 'days');
    const tomorrow = moment(today).add(1, 'days');
    CarFlow.find(
        {
            'CrossTrafficData.DateTime': {
                $gt: week_ago.toISOString(),
                $lte: tomorrow.toISOString()
            }
        },
        '-_id -__v',
        (err, data_t) => {
            if (err) {
                const message = {message: '数据库查询错误', err: err};
                res.status(200).json(message)
            }
            res.status(200).json(data_t);
        }
    );
});

/**
 * 返回某一个cross id 的所有数据
 * **/

router.get('/cross/:id', (req, res) => {
    CarFlow.find(
        {'CrossTrafficData.CrossID': id},
        '-_id -__v',
        (err, data_id) => {
            if (err) {
                res.status(200).json(err);
            }
            res.status(200).json(data_id);
        }
    );
});

/**
 *  返回某一个 cross id 车道的信息
 * **/
router.get('/cross/:id/lane/:no', (req, res) => {
    CarFlow.find(
        {
            'CrossTrafficData.CrossID': id,
            'CrossTrafficData.DataList.Data.LaneNo': no
        },
        (err, data_id_no) => {
            if (err) {
                res.status(200).json(err);
            }
            res.status(200).json(data_id_no);
        }
    );

});

/**
 *  开时间 + 结束时间  查询
 * **/

router.get('/start=:timestart&end=:timeend', (req, res) => {
    CarFlow.find(
        {'CrossTrafficData.DateTime': {$gt: start, $lte: end}},
        '-_id -__v',
        (err, data_p) => {
            if (err) {
                res.status(200).json(err);
            }
            res.status(200).send(data_p);
        }
    );

});

/**
 *  查询某个 cross id  某段时间的数据 - 使用
 * **/
router.get('/cross/:id/start=:timestart&end=:timeend/:page', (req, res) => {

    let total_page = 0;
    const id = req.params.id;
    const start = req.params.timestart;
    const end = req.params.timeend;
    const page = req.params.page;

    CarFlow.count(
        {
            'CrossTrafficData.CrossID': id,
            'CrossTrafficData.DateTime': {$gt: start, $lte: end}
        },
    )
        .then((total) => {
            total_count = total;
            CarFlow.find(
                {
                    'CrossTrafficData.CrossID': id,
                    'CrossTrafficData.DateTime': {$gt: start, $lte: end}
                },
                '-_id -__v',
            ).skip((page - 1) * 10).limit(10)
                .then((obj) => {
                    obj.push({total_count: total_count});
                    res.status(200).json(obj);
                })
        })

        .catch((err) => {
            res.status(200).json(err)
        });
});

/**
 *  返回一个具体 cross id  车位段和时间段的数据 - 分页 - 使用
 * **/
router.get(
    '/cross/:id/lane/lanestart=:lanest&laneend=:laneen/start=:timestart&end=:timeend/:page',
    (req, res) => {
        const id = req.params.id;
        const no_start = req.params.lanest;
        const no_end = req.params.laneen;
        const start = req.params.timestart;
        const end = req.params.timeend;
        const page = req.params.page;

        CarFlow.count(
            {
                'CrossTrafficData.CrossID': id,
                'CrossTrafficData.DataList.Data.LaneNo': {$gte: no_start, $lte: no_end},
                'CrossTrafficData.DateTime': {$gt: start, $lte: end}
            },
        )
            .then((total_count) => {

                CarFlow.find(
                    {
                        'CrossTrafficData.CrossID': id,
                        'CrossTrafficData.DataList.Data.LaneNo': {$gte: no_start, $lte: no_end},
                        'CrossTrafficData.DateTime': {$gt: start, $lte: end}
                    },
                    (err, obj) => {
                        if (err) {
                            res.status(200).json(err);
                        }
                        obj.push({total_count: total_count});
                        res.status(200).json(obj);
                    }
                ).skip((page - 1) * 10).limit(10);

            })
    }
);

/**
 *  某个车道最近三分钟的数据
 * **/
router.get('/cross/:id/last3min', (req, res) => {

    let now = moment().startOf('seconds');
    let now_back_3min = moment(now).subtract(3, 'minutes');
    now = now.add(8, 'hours'); //china
    now_back_3min = now_back_3min.add(8, 'hours');
    let now_str = timeUtil.ISO2String(now);
    let now_back_3min_str = timeUtil.ISO2String(now_back_3min);

    console.log(now_str);
    console.log(now_back_3min_str);

    CarFlow.find(
        {
            'CrossTrafficData.CrossID': req.params.id,
            'CrossTrafficData.DateTime': {$gt: now_back_3min_str, $lte: now_str}
        },
        '-_id -__v',
        (err, data_id_3min) => {
           if(err){
               res.status(200).json(err)
           }
           res.status(200).json(data_id_3min)
        }
    );
});

router.get('/last/:n', (req, res) => {

    CarFlow.find({}, (err, data_n) => {
        res.status(200).json(data_n)
    })
        .sort({_id: -1})
        .limit(parseInt(req.params.n));

});


/**
 *  查询 某个cross-id 下 某个车道 倒数的几条数据 -使用
 * **/
router.get('/cross/:id/lane/:no/last/:n', (req, res) => {
    const id = req.params.id;
    const no = req.params.no;
    const n = req.params.n;
    CarFlow.find(
        {
            'CrossTrafficData.CrossID': id,
            'CrossTrafficData.DataList.Data.LaneNo': no
        },
        '-_id -__v',
        (err, data_id_no_n) => {
           if(err){
               res.status(200).json(err);
           }
           res.status(200).json(data_id_no_n);
        }
    )
        .sort({'CrossTrafficData.DateTime': -1})
        .limit(parseInt(n));

});

router.get('/allcrossid', (req, res) => {

    CarFlow.distinct('CrossTrafficData.CrossID', (err, allCrossId) => {
        res.status(200).json(allCrossId);
    });

});


// // TODO 通过id 查询 车道 暂时写不出
// router.get('/getlane/:id', (req, res) => {
//     console.log(req.params.id);
//     CarFlow.findLaneByCrossId(req.params.id, (err, obj) => {
//         res.status(200).json(obj);
//     })
// });

module.exports = router;