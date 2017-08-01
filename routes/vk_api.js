let express = require('express');
let router = express.Router();
const mongodb = require('mongodb').MongoClient;

/**
 * Should c Contain object with structure
 * {appId: Number,
 * secretTocken: Number}
 */

const updateTime = 1000 * 60 * 60;//1 hour

setInterval( ()=> {
    console.log('Current time is - ' + new Date())
}, updateTime);

function readDataFromDb (url, loadDataLoad) {
    mongodb.connect(url, (err, db) => {
        let collection = db.collection('items');
        collection.find({}, {})
            .toArray(loadDataLoad);
    });
};

/** Load data from db **/
router.post('/db', (req, res, next) => {
    if (typeof req.body !== 'object' || !req.body.user || !req.body.key) {
        const errorMassage = 'Error: empty pass or username';

        res.status(404);
        res.setHeader('Content-Type', 'application/json');
        res.json({
            'error': errorMassage
        });
        return console.log(errorMassage);
    }

    let key = req.body.key.trim();
    let user = req.body.user.trim();
    let url = 'mongodb://' + user + 
        ':' + key + '@ds133981.mlab.com:33981/market-helper';


    readDataFromDb(url, (err, data) => {
        console.log(url)
        if (err) {
            console.log(err);
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }
    })
});

module.exports = router;
