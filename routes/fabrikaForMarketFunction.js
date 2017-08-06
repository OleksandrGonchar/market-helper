const https = require("https");
const market = require('./market-service');

const buyPrice = 50;
const selPrice = 60;


/**
 * parameter {itemId} irem id from item page '384801319'
 * parameter {itemGroup} item group from item page '0'
 * parameter {key} key created by key app 'your_key'
 * parameter {callback} function running after this function complite
 */
function getInformation(itemId, itemGroup, key, once) {
    const path = `/api/ItemInfo/${itemId}_${itemGroup}/ru/ru/?key=${key}`;
    let targetFunction = function() {
        const options = {
            host: 'market.csgo.com',
            path: path
        };
        console.log(callbackForResponce)
        const req = https.get(options, callbackForResponce);
    };

    targetFunction.once = once;

    return targetFunction();
}

function getMyInventory () {
    const urk = `https://market.csgo.com/api/GetInv/?key=[your_secret_key]`;
}

function setOrder(itemId, itemGroup, key) {
    const path = `/api/InsertOrder/${itemId}/${itemGroup}/[price]//?key=${key}`;

    let targetFunction = function() {
        const options = {
            host: 'market.csgo.com',
            path: path
        };

        const req = https.get(options, callbackForResponce);
    };

    targetFunction.once = truel

    return targetFunction;
}

function buySomeItem(itemId, itemGroup, key) {
    const path = `https://market.csgo.com/api/Buy/${itemId}_${itemGroup}/${price}//?key=${key}`;
    let targetFunction = function() {
        const options = {
            host: 'market.csgo.com',
            path: path
        };

        const req = https.get(options, callbackForResponce);
    };

    targetFunction.once = truel

    return targetFunction;
}

function callbackForResponce(res) {
    // Buffer the body entirely for processing as a whole.
    let bodyChunks = [];
    res.on('data', function(chunk) {
        // You can process streamed parts here...
        bodyChunks.push(chunk);
    }).on('end', function() {
        const body = Buffer.concat(bodyChunks);
        console.log('BODY: ' + body);
        
        if (body.offers < 50) {

        }
    })
}


module.exports = getInformation;