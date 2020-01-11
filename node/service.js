var http = require("http");
var url = require("url");




function start(route,handle) {

    


    function OnRequest(request, response) { 
        var postData = "";

        var pathname = url.parse(request.url).pathname;

        console.log("Request for " + pathname + " reveived.");

        route(handle,pathname,response,request);
          
    }
    
    http.createServer(OnRequest).listen(8888);
    
    console.log("Service started!");
}

exports.start = start;






