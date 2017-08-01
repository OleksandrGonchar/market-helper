const mongodb = require('mongodb').MongoClient;
const collectionName = 'items';

function readDataFromDb(url) {
    return new Promise((resolve, reject) => {
        mongodb.connect(url, (err, db) => {
            if (err) {
                reject(err);
            } else {
                let collection = db.collection(collectionName);
                resolve(collection.find({}, {}).toArray());
            }
        });
    })
};

function setItemToCollection(url, data) {
    console.log(url, data);
    return new Promise((resolve, reject) => {
        mongodb.connect(url, (err, db) => {
            if(err) {
                console.log(err);
            } else {
                db.collection(collectionName).insert(
                    data,
                    (err, result) => {
                        console.log(err, result);
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
            }
        });
    })
}

module.exports = {
    read: readDataFromDb,
    set: setItemToCollection
};