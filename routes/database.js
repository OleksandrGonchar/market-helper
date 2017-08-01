const mongodb = require('mongodb').MongoClient;

function readDataFromDb(url, loadDataLoad) {
    mongodb.connect(url, (err, db) => {
        if (err) {
            loadDataLoad(err);
            return err;
        } else {
            let collection = db.collection('items');
            collection.find({}, {})
                .toArray(loadDataLoad);
        }
    });
};

module.exports = {
    read: readDataFromDb
};