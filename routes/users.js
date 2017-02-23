var express = require('express');
var router = express.Router();

var dummyBase = [
    {
        name: 'Some item',
        priceMarket: 10230,
        priceSteam: 2230,
        style: 'style="background: url(\'https:\/\/dummyimage.com/600x400/777780/ff0033.jpg&text=Hi+this+is+some+item\') no-repeat center;"'
    }, {
        name: 'Some item 1',
        priceMarket: 153200,
        priceSteam: 24320,
        style: 'style="background: url(\'https:\/\/dummyimage.com/600x400/777780/ff0033.jpg&text=Hi+this+is+some+item\') no-repeat center;"'
    }, {
        name: 'Some item 2',
        priceMarket: 1323200,
        priceSteam: 2330,
        style: 'style="background: url(\'https:\/\/dummyimage.com/600x400/777780/ff0033.jpg&text=Hi+this+is+some+item\') no-repeat center;"'
    }, {
        name: 'Some item 3',
        priceMarket: 1003,
        priceSteam: 246340,
        style: 'style="background: url(\'https:\/\/dummyimage.com/600x400/777780/ff0033.jpg&text=Hi+this+is+some+item\') no-repeat center;"'
    }, {
        name: 'Some item 4',
        priceMarket: 134300,
        priceSteam: 545420,
        style: 'style="background: url(\'https:\/\/dummyimage.com/600x400/777780/ff0033.jpg&text=Hi+this+is+some+item\') no-repeat center;"'
    }, {
        name: 'Some item 5',
        priceMarket: 1634300,
        priceSteam: 634,
        style: 'style="background: url(\'https:\/\/dummyimage.com/600x400/777780/ff0033.jpg&text=Hi+this+is+some+item\') no-repeat center;"'
    }, {
        name: 'Some item 6',
        priceMarket: 633,
        priceSteam: 63,
        style: 'style="background: url(\'https:\/\/dummyimage.com/600x400/777780/ff0033.jpg&text=Hi+this+is+some+item\') no-repeat center;"'
    }, {
        name: 'Some item 7',
        priceMarket: 643,
        priceSteam: 23640,
        style: 'style="background: url(\'https:\/\/dummyimage.com/600x400/777780/ff0033.jpg&text=Hi+this+is+some+item\') no-repeat center;"'
    }, {
        name: 'Some item 8',
        priceMarket: 36600,
        priceSteam: 3620,
        style: 'style="background: url(\'https:\/\/dummyimage.com/600x400/777780/ff0033.jpg&text=Hi+this+is+some+item\') no-repeat center;"'
    }, {
        name: 'Some item 9 ',
        priceMarket: 1030,
        priceSteam: 2630,
        style: 'style="background: url(\'https:\/\/dummyimage.com/600x400/777780/ff0033.jpg&text=Hi+this+is+some+item\') no-repeat center;"'
    }, {
        name: 'Some item 10',
        priceMarket: 1636400,
        priceSteam: 643,
        style: 'style="background: url(\'https:\/\/dummyimage.com/600x400/777780/ff0033.jpg&text=Hi+this+is+some+item\') no-repeat center;"'
    }, {
        name: 'Some item 11',
        priceMarket: 10360,
        priceSteam: 34620,
        style: 'style="background: url(\'https:\/\/dummyimage.com/600x400/777780/ff0033.jpg&text=Hi+this+is+some+item\') no-repeat center;"'
    }, {
        name: 'Some item 12',
        priceMarket: 63463643,
        priceSteam: 2063,
        style: 'style="background: url(\'https:\/\/dummyimage.com/600x400/777780/ff0033.jpg&text=Hi+this+is+some+item\') no-repeat center;"'
    }, {
        name: 'Some item 13',
        priceMarket: 63,
        priceSteam: 26346,
        style: 'style="background: url(\'https:\/\/dummyimage.com/600x400/777780/ff0033.jpg&text=Hi+this+is+some+item\') no-repeat center;"'
    }, {
        name: 'Some item14',
        priceMarket: 63100,
        priceSteam: 2640,
        style: 'style="background: url(\'https:\/\/dummyimage.com/600x400/777780/ff0033.jpg&text=Hi+this+is+some+item\') no-repeat center;"'
    }, {
        name: 'Some item 15',
        priceMarket: 163400,
        priceSteam: 2360,
        style: 'style="background: url(\'https:\/\/dummyimage.com/600x400/777780/ff0033.jpg&text=Hi+this+is+some+item\') no-repeat center;"'
    }
];

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.json(JSON.stringify(dummyBase));
});

module.exports = router;
