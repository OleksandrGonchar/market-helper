let express = require('express');
let router = express.Router();
const mongodb = require('mongodb').MongoClient;
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

function loadDataLoad (err, data){ 
    if(err) {
        console.log(err);
    } else {
        console.log('success: ' ,  data);
    }
};

function readDataFromDb (url, loadDataLoad) {
    mongodb.connect(url, (err, db) => {
        let collection = db.collection('items');
        collection.find({}, {})
            .toArray(loadDataLoad);
    });
};

/** Load data from db **/
router.post('/db', (req, res, next) => {
    if (typeof req.body !== 'object' && !req.body.user && !req.body.key) {
        return console.log('Error: empty pass or username');
    }

    let key = req.body.key.trim();
    let user = req.body.user.trim();
    let url = 'mongodb://' + user + 
        ':' + key + '@ds133981.mlab.com:33981/market-helper';

    readDataFromDb(url, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }
    })
});

/* GET home page. */
router.get('/', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(allIdGroups);
});

module.exports = router;
