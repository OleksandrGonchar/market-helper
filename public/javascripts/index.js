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

async function getDataFromDB() {
    const userName = document.getElementById('userName').value;
    const userPassword = document.getElementById('userPassword').value;
    const body = {
        user: userName,
        key: userPassword
    };
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    const req = await fetch('/api/database', {
        body: JSON.stringify(body),
        headers,
        'method': 'POST'
    }).catch(fail => console.log('Fail responce:', fail));

    const responceData = await req.json();
    console.log('Data responce:', responceData);
};

function setDataClickListener() {
    var userName = document.getElementById('userNameSet').value;
    var userPassword = document.getElementById('userPasswordSet').value;
    var id = document.getElementById('inputItemId').value;
    var group = document.getElementById('inputItemGroup').value;
    var priceBuy = document.getElementById('itemPriceBuy').value;
    var priceSeel = document.getElementById('itemPriceSeel').value;
    var count = document.getElementById('itemCount').value;

    postToDatabase('/api/database', {
        'user': userName,
        'key': userPassword,
        'data': {
            id: id,
            group: group,
            priceBuy: priceBuy,
            priceSeel: priceSeel,
            count: count
        }
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
