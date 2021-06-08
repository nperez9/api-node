const express = require('express');
const app = express();

app.get('/', function (req, res) {
  console.log('se ejecuto el index');
  res.send('Hola Mundo');
});

app.get('/contacto', function (req, res) {
  res.send('contacto');
});

app.listen(4000, () => {
  console.log('Aplicacion de express iniciada exitosamente');
});