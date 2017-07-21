let express = require('express');
let router = express.Router();
const mongodb = require('mongodb').MongoClient;
const conectUrl = 'mongodb://market-helper:123456@ds133981.mlab.com:33981/market-helper';
const fileSistem = require('./fileSistem');

fileSistem.read('test.json').then(function(e){
    console.log('file from promice', e);
});

/**
 * Should c Contain object with structure
 * {appId: Number,
 * secretTocken: Number}
 */
let allIdGroups = [];

const updateTime = 1000 * 60 * 60;//1 hour

setInterval( ()=> {
    console.log('Current time is - ' + new Date())
}, updateTime);

/* POST home page. */
router.post('/setNewGroup', (req, res, next) => {
    console.log(typeof (req.body), '\n', req.body);
    try {
        if (typeof req.body == 'object' && req.body.appId && req.body.secretTocken) {
            allIdGroups.push(req.body);
        }
        res.render('index', {title: 'Express'});
    } catch (e) {
        console.log(e);
        res.json('New Error');
    }
});


/* GET home page. */
router.get('/', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(allIdGroups);
});

module.exports = router;
