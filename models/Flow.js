var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var js2xmlparser = require('js2xmlparser');
var json2xml = require('json2xml');
var moment = require('moment');

var FlowSchema = new Schema({
    CrossTrafficData: {
        CrossID: String,
        DeviceType: String,
        DateTime: String,
        Interval: Number,
        DataList: {
            Data: {
                LaneNo: String,
                Volume: Number,
                AvgOccupancy: Number,
                AvgHeadTime: Number,
                AvgLength: Number,
                AvgSpeed: Number,
                Saturation: Number,
                Density: Number,
                Pcu: Number,
                AveQueueLength: Number,
                Volume1: Number,
                Volume2: Number,
                Volume3: Number,
                Volume4: Number,
                Volume5: Number
            }
        }
    }
});
FlowSchema.index(
    {
        'CrossTrafficData.DateTime': -1,
        'CrossTrafficData.DataList.Data.LaneNo': 1
    },
    {unique: true}
);
//Establish a model who decide the name of the collection, for example, 'flowCar' ------> flowcars in mongo db
var FlowModel = mongodb.mongoose.model('flowCar', FlowSchema);

//format: convert ISO date to string date
var ISO2String = function (obj) {
    var obj_str = obj.toISOString(); //now's type convert object to string automacally
    obj_str = obj_str.substring(0, 19).replace('T', ' ');
    //console.log(now_str);
    return obj_str;
};

//operations, in fact it's a class defenition!
var FlowOp = function () {
};
//function save
FlowOp.prototype.save = function (obj, callback) {
    var instance = new FlowModel(obj);
    instance.save(function (err) {
        callback(err);
    });
};
//Retrieve all data
FlowOp.prototype.findAll = function (callback) {
    //parametres of Model.find:condition,projection,cb
    //'-_id -__v' means _id and __v are filtered.
    FlowModel.find({}, '-_id -__v', (err, data_all) => {
        //js obj convert to json
        var data_all_json = JSON.stringify({data_all});
        callback(err, data_all_json);
    });
};
//Retrieve data of past 1 week
FlowOp.prototype.findNear = function (callback) {
    var today = moment().startOf('day');
    var week_ago = moment(today).subtract(7, 'days');
    var tomorrow = moment(today).add(1, 'days');
    FlowModel.find(
        {
            'CrossTrafficData.DateTime': {
                $gt: week_ago.toISOString(),
                $lte: tomorrow.toISOString()
            }
        },
        '-_id -__v',
        (err, data_t) => {
            var data_t_json = JSON.stringify({data_t});
            callback(err, data_t_json);
        }
    );
};
//Retrieve data by CrossID
FlowOp.prototype.findByCross = function (id, callback) {
    FlowModel.find(
        {'CrossTrafficData.CrossID': id},
        '-_id -__v',
        (err, data_id) => {
            var data_id_json = JSON.stringify({data_id});
            callback(err, data_id_json);
        }
    );
};
//Retrieve data by CrossID and LaneNo
FlowOp.prototype.findByCrossByLaneNo = function (id, no, callback) {
    FlowModel.find(
        {
            'CrossTrafficData.CrossID': id,
            'CrossTrafficData.DataList.Data.LaneNo': no
        },
        (err, data_id_no) => {
            var data_id_no_json = JSON.stringify({data_id_no});
            callback(err, data_id_no_json);
        }
    );
};


//Retrieve data in a certain period
FlowOp.prototype.findByPeriod = function (start, end, callback) {
    FlowModel.find(
        {'CrossTrafficData.DateTime': {$gt: start, $lte: end}},
        '-_id -__v',
        (err, data_p) => {
            var data_p_json = JSON.stringify({data_p});
            callback(err, data_p_json);
        }
    );
};

//Retrieve data by CrossID in a certain period
//example: http://localhost:4002/api/method=get&appkey=436etaq52e57a3cd028ab56b&seckey=sec-mj12Slu12w1Xs1er8ZzmGZqw5qrpFmqw25jHULr13eUZCswA/cross/87654321/start=2017-07-01 07:39:00&end=2017-07-01 07:39:15
FlowOp.prototype.findByCrossByPeriod = function (id, start, end, callback) {
    FlowModel.find(
        {
            'CrossTrafficData.CrossID': id,
            'CrossTrafficData.DateTime': {$gt: start, $lte: end}
        },
        '-_id -__v',
        (err, data_id_p) => {
            var data_id_p_json = JSON.stringify({data_id_p});
            callback(err, data_id_p_json);
        }
    );
};


/**
 *  需要调用 做分页的处理
 *  每次返回10条记录 并且计算返回需要分页数
 * **/
//Retrieve data in a certain period in a certain range of lanes
FlowOp.prototype.findByCrossByLaneRangeByPeriod = function (id,
                                                            no_start,
                                                            no_end,
                                                            start,
                                                            end,
                                                            page,
                                                            callback,
                                                            ) {
    FlowModel.find(
        {
            'CrossTrafficData.CrossID': id,
            'CrossTrafficData.DataList.Data.LaneNo': {$gte: no_start, $lte: no_end},
            'CrossTrafficData.DateTime': {$gt: start, $lte: end}
        },
        '-_id -__v',
        (err, data_id_range_p) => {
            callback(err, data_id_range_p);
        }
    ).skip((page - 1) * 10).limit(10);
};

/**
 * 得到该接口数据条数 返回对应的页面
 * 每页显示 10条  返回一共有多少条
 * **/
FlowOp.prototype.findByCrossByLaneRangeByPeriodTotalPages = function (id,
                                                                      no_start,
                                                                      no_end,
                                                                      start,
                                                                      end,
                                                                      callback) {
    FlowModel.count(
        {
            'CrossTrafficData.CrossID': id,
            'CrossTrafficData.DataList.Data.LaneNo': {$gte: no_start, $lte: no_end},
            'CrossTrafficData.DateTime': {$gt: start, $lte: end}
        },
        (err, data) => {
            callback(data);
        }
    )
};

//Retrieve data by CrossID for last 3 minutes
FlowOp.prototype.findByCrossNear3min = function (id, callback) {
    var now = moment().startOf('seconds');
    var now_back_3min = moment(now).subtract(3, 'minutes');
    //now = now.add(2,'hours');//france
    now = now.add(8, 'hours'); //china
    now_back_3min = now_back_3min.add(8, 'hours');
    var now_str = ISO2String(now);
    var now_back_3min_str = ISO2String(now_back_3min);
    console.log(now_str);
    console.log(now_back_3min_str);

    FlowModel.find(
        {
            'CrossTrafficData.CrossID': id,
            'CrossTrafficData.DateTime': {$gt: now_back_3min_str, $lte: now_str}
        },
        '-_id -__v',
        (err, data_id_3min) => {
            var data_id_3min_json = JSON.stringify({data_id_3min});
            callback(err, data_id_3min_json);
        }
    );
};
//Retrieve last n documents
FlowOp.prototype.findLastN = function (n, callback) {
    FlowModel.find({}, (err, data_n) => {
        var data_n_json = JSON.stringify({data_n});
        callback(err, data_n_json);
    })
        .sort({_id: -1})
        .limit(parseInt(n));
};

//Retrieve last n documents
FlowOp.prototype.findByCrossByLaneLastN = function (id, no, n, callback) {
    FlowModel.find(
        {
            'CrossTrafficData.CrossID': id,
            'CrossTrafficData.DataList.Data.LaneNo': no
        },
        '-_id -__v',
        (err, data_id_no_n) => {
            callback(err, data_id_no_n);
        }
    )
        .sort({'CrossTrafficData.DateTime': -1})
        .limit(parseInt(n));
};

/**
 * 返回所有的cross_id unique
 * **/

FlowOp.prototype.findAllCrossId = function (callback) {

    FlowModel.distinct('CrossTrafficData.CrossID', (err, allCrossId) => {
        callback(err, allCrossId);
    });
};

/**
 * 根据cross_id 查找id下的所有车道号
 * **/
FlowOp.prototype.findLaneByCrossId = function (crossid, callback) {

    // FlowModel.find({'CrossTrafficData.CrossID': crossid},
    //     {'CrossTrafficData.DataList.Data.LaneNo': 1}
    //     , (err, obj) => {
    //         console.log(obj);
    //         callback(obj);
    //     })

    FlowModel.aggregate([
        {$match:{'CrossTrafficData.CrossID': crossid }},
        {$project:{
            _id:0,
            laneNO:'CrossTrafficData.DataList.Data.LaneNo'
        }}
    ])
        .then((err, obj)=>{
        console.log(err, obj);
        callback(obj)
        })
};

//in this way, return not a class but object.
//if we need return a class, should change the code as:  modules.exports = FlowOp
module.exports = new FlowOp();
