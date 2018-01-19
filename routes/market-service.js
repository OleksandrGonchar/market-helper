const https = require("https");

const mongo = require('./database');
const keyService = require('./keyService');

const marketTypes = {
    csgo: 'csgo',
    pubg: 'pubg'
};

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
            console.log(`Start after ${(time * seconds)/10}\'s`);
        }
    }
    for(let i = 0; i < count; i++) {
        addToList(constructorForFunction(count - i));

    }
}

function chekDataOnMarket(configObject, market, inventory) {
    return function() {
        const host = `market.${configObject.marketType}.com`;
        const path = `/api/ItemInfo/${configObject.id}_${configObject.group}/ru/ru/?key=${market.key}`;
        const options = {
            host: host,
            path: path
        };

        const req = https.get(options, function(res) {
            // Buffer the body entirely for processing as a whole.
            let bodyChunks = [];
            res.on('error', function(err){
                console.log(err);
            }).on('data', function(chunk) {
                // You can process streamed parts here...
                bodyChunks.push(chunk);
            }).on('end', function() {
                const body = Buffer.concat(bodyChunks);
                
                list[list.length] = function(){
                    try {
                        let dataObject = JSON.parse(body);
                        dataHendler(dataObject, configObject, market, inventory[configObject.marketType]);
                    } catch(e) {
                        console.log(e);
                    }
                };
            });
        });
    }
}

/**
 * @param marketType            {String} string with type of market for different markets
 * @param arrayOfTargetPrices   {Array} array of price from mongo databse [{"price":"60","count":"10"},{"price":"65","count":"10"}]
 * @param arrayOfCurrentPrices  {Array} array of prices on market [{"price":"52","count":"54","my_count":"0"},{"price":"53","count":"38","my_count":"0"}]
 * @param minimalPriceOnMarket  {String} minimal price on market
 * @param marketKey             {String} string with market key
 * @param uiId                  {String} string with ui id for selling items
 * @return                      {Object} object contain host and path for request on market with max price
 */
function urlForSellCreator (marketType, arrayOfTargetPrices, arrayOfCurrentPrices, minimalPriceOnMarket, marketKey, uiId) {
    arrayOfTargetPrices = arrayOfTargetPrices.sort((a,b) => b.price-a.price);
    arrayOfCurrentPrices = arrayOfCurrentPrices.sort((a,b) => b.price-a.price);
    var filteredArrayOfTargetPrices = [];
    
    for (var i=0; i<arrayOfTargetPrices.length; i++) {
      var item1 = arrayOfTargetPrices[i];
      var flag = true;
      
      arrayOfCurrentPrices.forEach(item2 => {      
        if (item2.price == item1.price && item2.my_count >= item1.count) {
          flag = false
        }
      })
      console.log('flag',flag)
      if(flag) {
        filteredArrayOfTargetPrices.push(item1);
      }
    }
    console.log(filteredArrayOfTargetPrices);
    targetItem = filteredArrayOfTargetPrices.sort((a,b) => {
        return b-a;
    })[0];

    if (targetItem == undefined) {
        return null;
    }

    const price = +targetItem.price < +minimalPriceOnMarket ? (+minimalPriceOnMarket - 1) : +targetItem.price;

    console.log(targetItem.price, '<', minimalPriceOnMarket, '?', (minimalPriceOnMarket - 1), ':', targetItem.price);
    console.log('price', price)

    const host = `market.${marketType}.com`;
    const path = `/api/SetPrice/${uiId}/${price}/?key=${marketKey}`;
    const url = {
        host: host,
        path: path
    };
    console.log(url);
    return url
}

function sellItem(data, configObject, market, inventory) {

    if (inventory.ok != true) {
        return;
    }

    const targetItem = inventory.data.filter(item => {
        return item.i_classid == configObject.id && item.group == configObject.i_instanceid
    });

    if(targetItem.length > 0) {
        configObject.prices.map(item => {
            console.log(`Have different variant of price: ${JSON.stringify(item)}`)
        })
        const minimalPriceOnMarket = checkMinimalPrice(data.offers);
        //const price = +configObject.priceSeel < +minimalPriceOnMarket ? (+minimalPriceOnMarket - 1) : +configObject.priceSeel;

        options = urlForSellCreator(configObject.marketType ,configObject.prices, data.offers, minimalPriceOnMarket, market.key, targetItem[0].ui_id);

        if(!options) {
            console.log(`Error: Options is empty.
                ${options}
            `);
            return;
        }

        https.get(options, function(res) {
            let bodyChunks = [];
            res.on('error', function(err){
                console.log(err);
            }).on('data', function(chunk) {
                bodyChunks.push(chunk);
            }).on('end', function() {
                const responce = JSON.parse(Buffer.concat(bodyChunks));
                
                if (responce.result == 1) {
                    console.log(`Item with id ${responce.item_id} set for sell with price ${responce.price}p`);
                }
            });
        });
    };
};

function updateOrderGenerator(data, configObject, market, inventory) {
/**
 * ToDo
 */
};

function updateInventory(market) {
    const host = 'market.csgo.com';
    const path = `/api/UpdateInventory/?key=${market.key}`;
    const options = {
        host: host,
        path: path
    };

    setTimeout(function() {
        try {
            console.log(`Start update`);
            https.get(options, function(res) {
                let bodyChunks = [];

                res.on('error', function(err){
                    console.log(`Error in update database 
                    ${err}`);
                }).on('data', function(chunk) {
                    console.log('Data')
                    bodyChunks.push(chunk);
                }).on('end', function() {
                    console.log('End')
                    const body = Buffer.concat(bodyChunks);
                });
            });
        } catch(e) {
            console.log(`Unhendled error in update inventory method: ${e}`);
        }
    }, intervalTimeOut);
};

/**
 * @description this function get array with structure like [{price: 40, count: 1, my_count: 1}]
 * and return minimal price without your count
 * @param {array} arrayOffers 
 */
function checkMinimalPrice(arrayOffers) {
    let minimalPrice;
    arrayOffers.some((item) => {
        if (item.my_count == 0 && item.count > 0) {
            minimalPrice = item.price;
            return true;
        } else {
            return false;
        }
    });

    return minimalPrice
};

function dataHendler(data, configObject, market, inventory) {
    try {
        let myCount = 0;
        let myBuyOffers = 0;
        let iWantSell = 0;

        if (!data.offers || !data.buy_offers) {
            return;
        }

        configObject.prices.map(ex => {
            //sum of all items i want to byy
            iWantSell += +ex.count;
        });

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
    } catch(e) {
        console.log(`Error from dataHendler:
        ${e}`);
    }
}

function setOrder(configObject, marketObject, market) {
    const host = `market.${configObject.marketType}.com`;
    const path = `/api/InsertOrder/${configObject.id}/${configObject.group}/${configObject.priceBuy}//?key=${market.key}`;

    let targetFunction = function() {
        const options = {
            host: host,
            path: path
        };

        list[list.length] = function() {
            const req = https.get(options, function(res) {
                let bodyChunks = [];
                res.on('error', function(err){
                    console.log(err);
                }).on('data', function(chunk) {
                    bodyChunks.push(chunk);
                }).on('end', function() {
                    const body = Buffer.concat(bodyChunks);
                });
            });
        };
    };

    list[list.length] = targetFunction;
};

function takeInventoryFromMarket(marketType, market, timeout) {
    const host = `market.${marketType}.com`;
    const path = `/api/GetInv/?key=${market.key}`;
    const options = {
        host: host,
        path: path
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('inventory taked :', (new Date()).toString());
            https.get(options, function(res) {
                let bodyChunks = [];      
                    res.on('error', function(err){
                        console.log(`Finaly I catch error!!`);
                        console.log(err);
                    }).on('data', function(chunk) {
                        bodyChunks.push(chunk);
                    }).on('end', function() {
                        let inventory;
                        try {
                            inventory = JSON.parse(Buffer.concat(bodyChunks));
                            resolve(inventory);
                        } catch(e) {
                            console.error(e);
                        }
                    })
                });
          }, timeout);
        })  
    };

function feelFromDataBase(mlab, market) {
    let url = `mongodb://${mlab.login}:${mlab.key}@ds133981.mlab.com:33981/market-helper`;
    updateInventory(market);
    createDummyFuncForTimeout(10);

    Promise.all([
        takeInventoryFromMarket(marketTypes.csgo, market, 500),
        takeInventoryFromMarket(marketTypes.pubg, market, 1000)
    ]).then((result) => {
        const inventory = {
            csgo: result[0],
            pubg: result[1]
        };
        mongo.read(url)
            .then((data) => {
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
    try {
        applyList();
    } catch(e) {
        console.log(`Error in apply list:\n${e}`);
    }
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

// runList();//test 

module.exports = {
    add: addToList,
    run: runList,
    stop: stopList,
    remove: removeFromList
};
