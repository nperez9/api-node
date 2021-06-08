const mysql = require('mysql2');
const http = require('http');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'asd123',
  database: 'sputify',
});

connection.connect((error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log('conectado master')
});

connection.query('SELECT * FROM artist', (err, results) => {
  if (err) {
    console.error(err);
    return;
  }

  results.map(r => console.log(r));
});


const servidor = http.createServer((request, response) => {
  console.log('primero');
  connection.query('SELECT * FROM artist', (err, results) => {
    if (err) {
      console.error(err);
      return;
    }

    let listaResultados = '';
    results.forEach(r => {
      listaResultados += `<div>${r.name}</div>`;
    });

    const peticionURL = request.url;

    
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(`
      <html> 
        <head> 
          <title>Mi primera pagina con node </title>
        </head>
        <body> 
          ${(peticionURL === '/contacto') ? 'Pagina de contacto' : 'Esta es la home'}
          ${listaResultados}
          <h1> Nuestra url es: ${peticionURL}</h1>
        </body>
      </html>`
    );
    response.end();
  });
});

console.log('segundo');

servidor.listen(4000);
console.log('Servidor web iniciado');




