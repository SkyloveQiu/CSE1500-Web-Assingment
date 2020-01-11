var service = require("./service");
var router = require("./router");
var requestsHandlers = require("./requestsHandlers");
requestsHandlers["/"] = requestsHandlers.start;
requestsHandlers["/start"] = requestsHandlers.start;
requestsHandlers["/upLoad"] = requestsHandlers.upLoad;


console.log(requestsHandlers.start);
service.start(router.route,requestsHandlers);



