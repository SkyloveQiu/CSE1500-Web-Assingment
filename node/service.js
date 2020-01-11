var http = require("http");
var url = require("url");




function start(route,handle) {

    


    function OnRequest(request, response) { 
        var postData = "";

        var pathname = url.parse(request.url).pathname;

        console.log("Request for " + pathname + " reveived.");

        request.setEncoding("utf8");

        request.addListener("data",function(postDataChunk) {
            postData += postDataChunk;

            console.log("Receive POST data chunk" + postDataChunk + ".");

            
        });

        request.addListener("end",function () {
            route(handle,pathname,response,postData);
          });
    }
    
    http.createServer(OnRequest).listen(8888);
    
    console.log("Service started!");
}

exports.start = start;






