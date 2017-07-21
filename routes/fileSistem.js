const fs = require("fs");

const fileSistem = {
    read: read
};

function read(name){
    return new Promise(function (resolve, reject) {
        fs.readFile(name,'utf8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

function write(name){

}

module.exports = fileSistem;
