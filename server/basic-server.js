mem=[];
var http = require("http");
var handleRequest = require("./request-handler.js");

var port = process.env.PORT || 3000;
var ip =process.env.IP || "127.0.0.1";
var server = http.createServer(handleRequest.requestHandler);
console.log("Listening on http://" + ip + ":" + port);

server.listen(port,ip);
