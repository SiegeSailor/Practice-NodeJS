var http = require("http");

http
  .createServer(function(request, response) {
    console.log(request.url);
    response.writeHead(200, { "Content-Type": "text/plain" }); // Content-Type 會影響 reponse.write() 內的值的表現方式
    response.write("Hello World"); // 若為 text/html，則可使用 Html Tag，並會以 DOM Render
    response.end();
  })
  .listen(8080);
