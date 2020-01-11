function route(handle,pathname,responses,postData) {
    console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === "function") {
        return handle[pathname](responses,postData);
    } else {
        console.log("No file was found");
        responses.writeHead("404",{"Content-Type" : "text/plain"});
        responses.write("404 Not Found");
        responses.end();
    }
}   

exports.route = route;