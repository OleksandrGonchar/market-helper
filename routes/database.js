const mongodb = require('mongodb').MongoClient;

function readDataFromDb(url) {
    return new Promise(function (resolve, reject) {
        mongodb.connect(url, (err, db) => {
            if (err) {
                reject(err);
            } else {
                let collection = db.collection('items');
                resolve(collection.find({}, {}).toArray());
            }
        });
    })
};

function setItemToCollection() {

}

module.exports = {
    read: readDataFromDb,
    set: setItemToCollection
};