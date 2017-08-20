const keyService = {};
const fs = require('fs');

/**
 * writeFile function create file with key on server fir saving key
 * parameter {data} Object with structure
 * {
 *  'type': {market || mongoLab},
 *  'key': {value}
 * }
 * how use:
 * for key for market
 * keyService.save({
 *  'type': 'market',
 *  'key': '789456123'
 * });
 * for key for mongoLab
 * keyService.save({
 *  'type': 'mongolab',
 *  'key': '789456123'
 * });
 */

function writeFile (data) {
    fs.writeFile(`key${data.type}.json`, JSON.stringify(data), (err) => {
        if (err) {
            return console.log(err);
        } 

        console.log('The file was saved!');
    }); 
};

function readFile(name) {
    return new Promise((resolve) => {
        fs.readFile(name, 'utf8', (err, data) => {
            if (err) {
                return console.log(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};

keyService.save = function(data) {
    writeFile(data);

    console.log(`Save data key,
        key for ${data.type},
        key value ${data.key}
    `);
};

/**
 * function get rerun key
 * parameter {name} string name of key storage
 * output {Promice} return promice with string data from file
 */
keyService.get = function(name) {
    return readFile(name);
};

module.exports = keyService;