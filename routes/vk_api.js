var express = require('express');
var router = express.Router();
/**
 * Should c Contain object with structure
 * {appId: Number,
 * secretTocken: Number}
*/
var allIdGroups = [];

/* POST home page. */
router.post('/', function(req, res, next) {
    console.log(typeof (req.body));
    try {
        if(typeof req.body == 'object') {
            console.log(req.body);
            allIdGroups.push(req.body);
            res.render('index', { title: 'Express' });
        }
    } catch (e) {
        console.log(e);
        res.json('New Error');
    }
});


/* GET home page. */
router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.json(JSON.stringify(allIdGroups));
});



module.exports = router;
