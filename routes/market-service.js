const https = require("https");

const mongo = require('./database');
const keyService = require('./keyService');

const intervalTimeOut = 250;//millesecund 

let list = [
    function(){
        console.log(1);
    },
    function(){
        console.log(2);
    },
    function(){
        console.log(3);
    }
];

/**
 * Variable for cycle, if false cycle can't start
*/
let go = true;

function createDummyFuncForTimeout(seconds) {
    let count = (seconds * 1000)/intervalTimeOut;
    let constructorForFunction = function(time) {
        return function() {
            console.log(`Weiting for updates ${time}\'s`);
        }
    }
    for(let i = 0; i < count; i++) {
        addToList(constructorForFunction(count - i));

    }
}

function chekDataOnMarket(configObject, market, inventory) {
    return function() {
        const host = 'market.csgo.com';
        const path = `/api/ItemInfo/${configObject.id}_${configObject.group}/ru/ru/?key=${market.key}`;
        const options = {
            host: host,
            path: path
        };

        const req = https.get(options, function(res) {
            // Buffer the body entirely for processing as a whole.
            let bodyChunks = [];
            res.on('data', function(chunk) {
                // You can process streamed parts here...
                bodyChunks.push(chunk);
            }).on('end', function() {
                const body = Buffer.concat(bodyChunks);
                
                list[list.length] = function(){
                    try {
                        let dataObject = JSON.parse(body);
                        dataHendler(dataObject, configObject, market, inventory);
                    } catch(e) {
                        console.log(e);
                    }
                };
            });
            
            res.on('error', function(err){
                console.log(err);
            });
        });
    }
}

function sellItem(data, configObject, market, inventory) {

    if (inventory.ok != true) {
        return;
    }

    const targetItem = inventory.data.filter(item => {
        return item.i_classid == configObject.id && item.group == configObject.i_instanceid
    });

    if(targetItem.length > 0) {
        //console.log('\n\n\n\n', configObject, targetItem);
        const host = 'market.csgo.com';
        const path = `/api/SetPrice/${targetItem[0].ui_id}/${configObject.priceSeel}/?key=${market.key}`;
        const options = {
            host: host,
            path: path
        };

        https.get(options, function(res) {
            console.log(path)
            let bodyChunks = [];
            res.on('data', function(chunk) {
                bodyChunks.push(chunk);
            }).on('end', function() {
                const responce = JSON.parse(Buffer.concat(bodyChunks));
                if (responce.result == 1) {
                    console.log(`Item with id ${responce.item_id} set for sell with price ${responce.price}p`);
                }
            });
            
            res.on('error', function(err){
                console.log(err);
            });
        });
    };
};

function updateInventory(market) {
    const host = 'market.csgo.com';
    const path = `/api/UpdateInventory/?key=${market.key}`;
    const options = {
        host: host,
        path: path
    };

    setTimeout(function() {
        https.get(options, function(res) {
            let bodyChunks = [];
            res.on('data', function(chunk) {
                bodyChunks.push(chunk);
            }).on('end', function() {
                const body = Buffer.concat(bodyChunks);
            });
            
            res.on('error', function(err){
                console.log(err);
            });
        });
    }, intervalTimeOut);
};

function dataHendler(data, configObject, market, inventory) {
    let myCount = 0;
    let myBuyOffers = 0;

    for (let i = 0; i < data.offers.length; i++) {
        myCount += +data.offers[i].my_count
    }

    for (let k = 0; k < data.buy_offers.length; k++) {
        myBuyOffers += +data.buy_offers[k].my_count
    }

    if (myCount < configObject.count && myBuyOffers == 0) {
        console.log(`I nead more ${data.name}`);
        setOrder(configObject, data, market);
    }

    if (myCount < configObject.count) {
        sellItem(data, configObject, market, inventory);
    }
}

function setOrder(configObject, marketObject, market) {
    const host = 'market.csgo.com';
    const path = `/api/InsertOrder/${configObject.id}/${configObject.group}/${configObject.priceBuy}//?key=${market.key}`;

    let targetFunction = function() {
        const options = {
            host: host,
            path: path
        };

        list[list.length] = function() {
            const req = https.get(options, function(res) {
                let bodyChunks = [];
                res.on('data', function(chunk) {
                    bodyChunks.push(chunk);
                }).on('end', function() {
                    const body = Buffer.concat(bodyChunks);
                });
                
                res.on('error', function(err){
                    console.log(err);
                });
            });
        };
    };

    list[list.length] = targetFunction;
};

function feelFromDataBase(mlab, market) {
    let url = `mongodb://${mlab.login}:${mlab.key}@ds133981.mlab.com:33981/market-helper`;
    
    const host = 'market.csgo.com';
    const path = `/api/GetInv/?key=${market.key}`;
    const options = {
        host: host,
        path: path
    }

    //update inventory
    console.log('start update inventry')
    updateInventory(market);
    //create dummy function for timeout
    createDummyFuncForTimeout(10);

    https.get(options, function(res) {
        let bodyChunks = [];
        res.on('data', function(chunk) {
            bodyChunks.push(chunk);
        }).on('end', function() {
            const inventory = JSON.parse(Buffer.concat(bodyChunks));

            mongo.read(url).then(
                data => {
                    for (let i = 0; i < data.length; i++) {
                        let fun = chekDataOnMarket(data[i].data, market, inventory);
                        list[list.length] = fun;
                    }
                    console.log('Run');
                    runList();
                }, err => {
                    console.log('ERROR: ', err.message);
                    //reject(err);
                });
        });
        
        res.on('error', function(err){
            console.log(err);
        });
    });
}

function addToList (task) {
    list.push(task);
}

function shiftList () {
    list.shift();
}

function unshift(task) {
    list.shift(task);
}

function removeFromList () {

}

function runList () {
    go =  true;
    applyList();
}

function applyList () {
    const length = list.length;
    if (length == 0) {
        Promise.all([
            keyService.get('keymongolab.json'),
            keyService.get('keymarket.json')
        ]).then((parameters) => {
            feelFromDataBase(parameters[0], parameters[1]);
        }).catch(e=>console.log(e));
    }

    if (go && length !== 0) {
        const usedElementFromList = list[0];///take first function from list 
        usedElementFromList();//apply first element from list
        shiftList();
        awaitRun();
    } else {
        go = false;
        return console.log('List empty');
    }
}

function stopList () {
    go = false;
}

function awaitRun() {
    setTimeout(() => {
        applyList();
    }, 255);
}

keyService.get('keymarket.json')
    .then(data => console.log('wtf!!',data))
    .catch(e=>console.log(e));

module.exports = {
    add: addToList,
    run: runList,
    stop: stopList,
    remove: removeFromList
};
