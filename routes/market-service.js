let i = 0;

let list = [
    function(){
        console.log(i++);
    },
    function(){
        console.log(i++);
    },
    function(){
        console.log(i++);
    },
    function(){
        console.log(i++);
    },
    function(){
        console.log(i++);
    },
    function(){
        console.log(i++);
    }
];

/**
 * Variable for cycle, if false cycle can't start
*/
let go = true;

function addToList (task) {
    console.log('Add to list');
    list.push(task);
}

function shiftList () {
    list.shift();
}

function unshift(task) {
    list.shift(task);
}

function removeFromList () {

}

function runList() {
    go =  true;
    applyList();
}

function applyList () {
    if (go && list.length !== 0) {
        list[0].apply(this);
        
        shiftList();
        awaitRun();
    } else {
        go = false;
        return console.log('List empty');
    }
}

function stopList () {
    go = false;
}

function awaitRun() {
    setTimeout(function(){
        applyList();
    }, 250);
}


module.exports = {
    add: addToList,
    run: runList,
    stop: stopList,
    remove: removeFromList
};
