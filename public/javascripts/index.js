function setUser(data) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/setNewGroup', true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onload = function () {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.onerror = function () {
            reject(new Error("Network Error"));
        };
        xhr.send(JSON.stringify(data));
    });
};

function getFromDB(url, data) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onload = function () {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.onerror = function () {
            reject(new Error("Network Error"));
        };
        xhr.send(JSON.stringify(data));
    });
};

function getDataFromDB() {
    var userName = document.getElementById('userName').value;
    var userPassword = document.getElementById('userPassword').value;

    getFromDB("/api/db", {
        'user': userName,
        'key': userPassword
    })
    .then(
        response = function(response){console.log(response)},
        error = function(e) {
            console.log('Rejected ', e)
        }
    );
};

document.addEventListener('DOMContentLoaded', function(e){
    e.preventDefault();
    var buttonShowDBData = document.getElementById('loadDB');

    buttonShowDBData.addEventListener('click', getDataFromDB);
});
