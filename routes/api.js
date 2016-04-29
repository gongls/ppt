var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({})
});

router.get("/timeline/:daysNumber", function (req, res) {
    var daysNumber=req.params.daysNumber;
    var timeline_json={
        name:'JiangSong',
        begin_time:'2016-04-01',
        end_time:'2016-05-01',
        symptoms: [
            {
                "name": "眩晕",
                "desc": "轻度",
                "start_time": "2016-04-20",
                "end_time": "2016-04-22"
            },
            {
                "name": "腹痛",
                "desc": "饭后腹痛",
                "start_time": "2016-04-01",
                "end_time": "2016-04-06"
            },
            {
                "name": "四肢无力",
                "desc": "爬楼梯爬不动",
                "start_time": "2016-04-25",
                "end_time": "2016-04-28"
            }
        ],
        timelines:[
            {
                name:'血糖',
                line_color:'#ADFF2F',
                unit:'mmol/L',
                min:3.9,//
                max:6.1,
                tests:[
                    {
                        time:'2016-04-01',
                        value:2.5
                    },
                    {
                        time:'2016-04-03',
                        value:2.5
                    },
                    {
                        time:'2016-04-05',
                        value:8.2
                    },
                    {
                        time:'2016-04-07',
                        value:1.3
                    },{
                        time:'2016-04-08',
                        value:5.9
                    },{
                        time:'2016-04-09',
                        value:1.3
                    },{
                        time:'2016-04-10',
                        value:3.9
                    },{
                        time:'2016-04-11',
                        value:1.2
                    },{
                        time:'2016-04-12',
                        value:7
                    },{
                        time:'2016-04-13',
                        value:2
                    },{
                        time:'2016-04-15',
                        value:8
                    },{
                        time:'2016-04-17',
                        value:3
                    },{
                        time:'2016-04-18',
                        value:5.2
                    },{
                        time:'2016-04-19',
                        value:0
                    },{
                        time:'2016-04-20',
                        value:1.2
                    },{
                        time:'2016-04-21',
                        value:7
                    },{
                        time:'2016-04-22',
                        value:9
                    },{
                        time:'2016-04-23',
                        value:5.2
                    },{
                        time:'2016-04-25',
                        value:3.2
                    },{
                        time:'2016-04-28',
                        value:3.2
                    },{
                        time:'2016-04-29',
                        value:1.3
                    },{
                        time:'2016-04-30',
                        value:3.3
                    },{
                        time:'2016-05-01',
                        value:5.3
                    }
                ]
            },
            {
                name:'心率',
                line_color:'#8B008B',
                unit:'bpm',
                min:60,
                max:100,
                tests:[
                    {
                        time:'2016-04-01',
                        value:70
                    },
                    {
                        time:'2016-04-02',
                        value:65
                    },
                    {
                        time:'2016-04-03',
                        value:130
                    },
                    {
                        time:'2016-04-04',
                        value:89
                    },
                    {
                        time:'2016-04-05',
                        value:120
                    },
                    {
                        time:'2016-04-06',
                        value:90
                    },
                    {
                        time:'2016-04-10',
                        value:86
                    },
                    {
                        time:'2016-04-15',
                        value:56
                    },
                    {
                        time:'2016-04-18',
                        value:161
                    },
                    {
                        time:'2016-04-19',
                        value:65
                    },
                    {
                        time:'2016-04-23',
                        value:153
                    },
                    {
                        time:'2016-04-28',
                        value:78
                    },
                    {
                        time:'2016-05-01',
                        value:66
                    }
                ]
            }
        ]
    };
    switch (daysNumber){
        case "30":
            break;
        case "7":
            timeline_json.end_time='2016-04-07';
            break;
    }
    res.json(timeline_json);
});

module.exports = router;
