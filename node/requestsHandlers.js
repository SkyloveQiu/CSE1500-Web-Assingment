var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function start(responses,postData) {
    console.log("Request for start was called");
    var content = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+ 'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+ 'method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+ '</form>'+
    '</body>'+
    '</html>';

    responses.writeHead(200,{"Content-Type" : "text/html"});
    responses.write(content);
    responses.end();
    return content;

}

function upLoad(responses,request) {
    var form = new formidable.IncomingForm();

    form.parse(request,function(error,fields,file) {
        fs.renameSync(file.upload.path, "Web-Assignment/node/tmp/test.png");
        responses.writeHead(200,{"Content-Type" : "text/html"});
        responses.write("received image:<br/>");
        responses.write("<img src='/show' />");
        responses.end();
    })
}


function show(responses,postData) {
    console.log("Request handler 'show' was called.");
    fs.readFile("Web-Assignment/node/tmp/test.png","binary",function (error, file) {
        if (error) {
            responses.writeHead(500,{"Content-Type" : "text/plain"});
            responses.write(error.message);
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