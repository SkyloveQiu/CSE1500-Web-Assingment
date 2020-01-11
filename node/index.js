var service = require("./service");
var router = require("./router");
var requestsHandlers = require("./requestsHandlers");
requestsHandlers["/"] = requestsHandlers.start;
requestsHandlers["/start"] = requestsHandlers.start;
requestsHandlers["/upload"] = requestsHandlers.upLoad;
requestsHandlers["/show"] = requestsHandlers.show;
console.log(requestsHandlers.start);
service.start(router.route,requestsHandlers);



