const https = require("https");

/**
 * parameter {itemId} irem id from item page '384801319'
 * parameter {itemGroup} item group from item page '0'
 * parameter {key} key created by key app 'your_key'
 * parameter {callback} function running after this function complite
 */
function fabrica(itemId, itemGroup, key, once, callback) {
    let targetFunction = function() {
        const options = {
            host: 'market.csgo.com',
            path: `/api/ItemInfo/${itemId}_${itemGroup}/ru/ru/?key=${key}`
        };

        const req = https.get(options, function(res) {
            // Buffer the body entirely for processing as a whole.
            let bodyChunks = [];
            res.on('data', function(chunk) {
                // You can process streamed parts here...
                bodyChunks.push(chunk);
            }).on('end', function() {
                const body = Buffer.concat(bodyChunks);
                console.log('BODY: ' + body);
                callback(body);
            })
        });

        req.on('error', function(e) {
        console.log('ERROR: ' + e.message);
        });
    };

    targetFunction.once = once;

    return targetFunction;
}


module.exports = fabrica;