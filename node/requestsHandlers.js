var querystring = require("querystring");
var fs = require("fs");
function start(responses,postData) {
    console.log("Request for start was called");
    var content = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+ 'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+ '<input type="submit" value="Submit text" />'+ '</form>'+'</body>'+ '</html>';


    responses.writeHead(200,{"Content-Type" : "text/html"});
    responses.write(content);
    responses.end();
    return content;

}

function upLoad(responses,postData) {
    responses.writeHead(200,{"Content-Type" : "text/plain"});
    responses.write("You've sent: "+ querystring.parse(postData).text);
    responses.end();
}


function show(responses,postData) {
    console.log("Request handler 'show' was called.");
    fs.readFile("/tmp/test.png","binary",function (error, file) {
        if (error) {
            responses.writeHead(500,{"Content-Type" : "text/plain"});
            responses.write(error);
            responses.end();
        } else {
            responses.writeHead(200,{"Content-Type" : "image/png"});
            responses.write(file,"binary");
            responses.end();
        }
      })
}


exports.start = start;
exports.upLoad = upLoad;
exports.show = show;