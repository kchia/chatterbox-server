mem=[];
var http = require("http");
var handleRequest = require("./request-handler.js");
var urlParser = require('url');

var port = process.env.PORT || 3000;
var ip =process.env.IP || "127.0.0.1";

var server = http.createServer(function(request,response){
  console.log("Serving request type " + request.method + " for url " + request.url);

  var parts = urlParser.parse(request.url);

  if ( parts.pathname === '/' ){
    handleRequest.requestHandler(request,response);
  }

});

console.log("Listening on http://" + ip + ":" + port);

server.listen(port,ip);
