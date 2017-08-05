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
    var name = document.getElementById('inputData').value;

    postToDatabase('/api/database', {
        'user': userName,
        'key': userPassword,
        'data': {name: name}
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

function applicationControls() {
    var userName = document.getElementById('userNameRun').value;
    var userPassword = document.getElementById('userPasswordRun').value;
    var userMethod = document.getElementById('userMethod').value;

    postToDatabase('/api/run', {
        'user': userName,
        'key': userPassword,
        'method': userMethod
    }, 'post').then(
        response = function(response){console.log('Server say: ', response)},
        error = function(e) {
            console.log('Rejected ', e)
        }
    );
};

function createTAsk() {
    var userName = document.getElementById('userNameCreateTask').value;
    var userPassword = document.getElementById('userPasswordCreateTask').value;

    var itemId = document.getElementById('itemIdCreateTask').value;
    var itemGroup = document.getElementById('itemGroupCreateTask').value;
    var applicationKey = document.getElementById('applicationKey').value;

    postToDatabase('/api/task', {
        'user': userName,
        'key': userPassword,
        'itemId': itemId,
        'itemGroup': itemGroup,
        'AppKey' : applicationKey
    }, 'post').then(
        response = function(response){console.log('Server say: ', response)},
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
    var buttonRunApp = document.getElementById('runApp');
    var buttonCreateTask = document.getElementById('createTask');

    buttonCreateTask.addEventListener('click', createTAsk);
    buttonShowDBData.addEventListener('click', getDataFromDB);
    buttonSetDBData.addEventListener('click', setDataClickListener);
    buttonDeleteDBData.addEventListener('click', deleteDataClickListener);
    buttonRunApp.addEventListener('click', applicationControls);
});
