function httpGet(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
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
        xhr.send();
    });
}

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

httpGet("/api")
    .then(
        response = function(response){console.log(response)},
        error = function() {console.log('Rejected')}
);

function getSavedUsers() {
    httpGet("/api")
    .then(
        response = function(response){console.log(response)},
        error = function(e) {
            console.log('Rejected ', e)
        }
    );
};

document.addEventListener('DOMContentLoaded', function(){
    var buttonSetData = document.getElementById('submit');
    var buttonShowData = document.getElementById('load');

    buttonShowData.addEventListener('click', getSavedUsers);

    buttonSetData.addEventListener('click', function(e){
        e.preventDefault();
        var appId = document.getElementById('appId').value;
        var secretTocken = document.getElementById('secretTocken').value;
        setUser({
            'appId': appId,
            'secretTocken': secretTocken
        });
    });
});
