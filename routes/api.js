const express = require('express');
const router = express.Router();
const mongo = require('./database');

/**
 * Should c Contain object with structure
 * {appId: Number,
 * secretTocken: Number}
 */

const updateTime = 1000 * 60 * 60;//1 hour

setInterval( ()=> {
    console.log('Current time is - ' + new Date())
}, updateTime);

/** Load data from db **/
router.post('/db', (req, res, next) => {
    const errorMassage = 'Error: empty pass or username';
    const errorResponce = {
        'error': errorMassage
    };

    if (typeof req.body !== 'object' || !req.body.user || !req.body.key) {
        res.status(404);
        res.setHeader('Content-Type', 'application/json');
        res.json(errorResponce);
        return console.log(errorMassage);
    }

    let key = req.body.key.trim();
    let user = req.body.user.trim();
    let url = 'mongodb://' + user +
        ':' + key + '@ds133981.mlab.com:33981/market-helper';


    mongo.read(url, (err, data) => {
        console.log(url);
        if (err) {
            res.setHeader('Content-Type', 'application/json');
            res.status(404);
            res.json(errorResponce);
            console.log(err);
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }
    })
});

module.exports = router;
