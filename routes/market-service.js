let i = 0;

let list = [
    function(){
        console.log(1);
    },
    function(){
        console.log(2);
    },
    function(){
        console.log(3);
    },
    function(){
        console.log(4);
    },
    function(){
        console.log(5);
    },
    function(){
        console.log(6);
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
        const usedElementFromList = list[0];///take first function from list 
        usedElementFromList();//apply first element from list
        list.push(usedElementFromList);//push used function from start to end list 
        
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
