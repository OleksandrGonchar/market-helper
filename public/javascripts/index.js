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

function postToDatabase(url, data, method) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
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

    postToDatabase('/api/database', {
        'user': userName,
        'key': userPassword
    }, 'POST').then(
        response = function(response){console.log('Data load: ', response)},
        error = function(e) {
            console.log('Rejected ', e)
        }
    );
};

function setDataClickListener() {
    var userName = document.getElementById('userNameSet').value;
    var userPassword = document.getElementById('userPasswordSet').value;
    var data = document.getElementById('inputData').value;

    postToDatabase('/api/database', {
        'user': userName,
        'key': userPassword,
        'data': data
    }, 'POST').then(
        response = function(response){console.log('Data save: ', response)},
        error = function(e) {
            console.log('Rejected ', e)
        }
    );
};

function deleteDataClickListener() {
    var userName = document.getElementById('userNameDelete').value;
    var userPassword = document.getElementById('userPasswordDelete').value;
    var data = document.getElementById('inputDataDelete').value;

    postToDatabase('/api/database', {
        'user': userName,
        'key': userPassword,
        'data': data
    }, 'DELETE').then(
        response = function(response){console.log('Data save: ', response)},
        error = function(e) {
            console.log('Rejected ', e)
        }
    );
};

document.addEventListener('DOMContentLoaded', function(e){
    e.preventDefault();
    var buttonShowDBData = document.getElementById('loadDB');
    var buttonSetDBData = document.getElementById('setdDB');
    var buttonDeleteDBData = document.getElementById('DeletedDB');

    buttonShowDBData.addEventListener('click', getDataFromDB);
    buttonSetDBData.addEventListener('click', setDataClickListener);
    buttonDeleteDBData.addEventListener('click', deleteDataClickListener);
});
