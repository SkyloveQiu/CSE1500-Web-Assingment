function start() {
    function sleep(miliseconds) {
        var startTime = new Date().getTime();
        while(new Date().getTime() < startTime + miliseconds) ;
    }
    sleep(10000);
    console.log("Request start was called");
    return "Hello Start";
}

function upLoad() {
    console.log("Request upLead was called");
    return "hello upload";
}

exports.start = start;
exports.upLoad = upLoad;