const express = require('express');
const router = express.Router();
const mongo = require('./database');
const market = require('./market-service');

/** Load data from db **/
router.post('/database', databaseFlow);
router.delete('/database', deleteDataFromDatabase);

function databaseFlow(req, res) {
    const errorMassage = 'Error: empty pass or username';
    const errorResponce = {
        'error': errorMassage
    };

    if (typeof req.body !== 'object' || !req.body.user || !req.body.key) {
        res.status(500);
        res.setHeader('Content-Type', 'application/json');
        res.json(errorResponce);
        return console.log(errorMassage);
    }

    let key = req.body.key.trim();
    let user = req.body.user.trim();
    let data = req.body.data;
    let url = 'mongodb://' + user +
        ':' + key + '@ds133981.mlab.com:33981/market-helper';

    if(data) {
        mongo.set(url, data).then(
            data => {
                res.setHeader('Content-Type', 'application/json');
                res.json(data);
            }, err => {
                console.log('ERROR: ', err.message);
                res.setHeader('Content-Type', 'application/json');
                res.status(500);
                res.json({
                    'error': err
                });
            });
    } else {
        mongo.read(url).then(
            data => {
                res.setHeader('Content-Type', 'application/json');
                res.json(data);
            }, err => {
                console.log('ERROR: ', err.message);
                res.setHeader('Content-Type', 'application/json');
                res.status(404);
                res.json({
                    'error': 'Authentication failed.'
                });
            });
    }
}

function deleteDataFromDatabase(req, res) {
    //console.log(req, res);

    let key = req.body.key.trim();
    let user = req.body.user.trim();
    let name = req.body.data;
    let url = 'mongodb://' + user +
            ':' + key + '@ds133981.mlab.com:33981/market-helper';

    mongo.delete(url, name).then(
        data => {
            //console.log(data);
            res.setHeader('Content-Type', 'application/json');
            res.json({'result': 'deletion success',"data": data});
        }, err => {
            //console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.json({'error': err.message});
        });
}

market.run();

module.exports = router;
