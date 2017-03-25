window.addEventListener("load", function load(event){
    console.log(event);
    var href = window.location.href;
    var array = href.split('/\#');

    var lastsegment = array[array.length-1];

    console.log(lastsegment);
});
