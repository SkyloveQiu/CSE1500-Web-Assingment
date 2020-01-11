var http = require("http");
var url = require("url");




function start(route,handle) {

    


    function OnRequest(request, response) { 
        var pathname = url.parse(request.url).pathname;
        console.log("Request for "+ pathname+" recevied.");
        
        response.writeHead(200, {"Content-Type": "text/plain"}); 

        response.write(route(handle,pathname));
        response.end();
    }
    
    http.createServer(OnRequest).listen(8888);
    
    console.log("Service started!");
}

exports.start = start;






