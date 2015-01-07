var headers = {
  'Content-Type' : "application/json",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var statusCode = 200;

var responses = {
  "GET":function(request,response){
    response.end(JSON.stringify({results:mem}));
  },
  "POST":function(request,response){
    var data = "";
    request.on("data",function(chunk){
      data += chunk;
    });
    request.on("end",function(cb){
      console.log(data);
      var entry = JSON.parse(data);
      if (mem.length === 0) {
        entry.objectId = 0;
      } else {
        entry.objectId = mem[mem.length-1].objectId + 1;
      }
      mem.push(entry);
    });
  },
  "OPTIONS":function(request,response){
    response.end(JSON.stringify({results:mem}));
  }

};

exports.requestHandler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  response.writeHead(statusCode, headers);
  if (responses[request.method]){
    responses[request.method](request,response);
  } else {
    // TODO: ERROR Message
  }
};
