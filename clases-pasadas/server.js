const http = require('http');

const server = http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(`
    <html>
      <body>
        <h1> Este es el server de node Funcionando </h1>
      </body>
    </html>
  `);
  response.end();
});

server.listen(3000);

console.log('Servidor inicializado');