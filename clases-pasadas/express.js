const express = require('express');
const mysql = require('mysql2');

const app = express();
const mysqlConfig = require('./config/config');

let gente = [
  'Berni',
  'Nico',
  'Dani',
  'Vane',
];


const connection = mysql.createConnection(mysqlConfig);

connection.connect((error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log('Conectado a la base de datos')
});

app.use(express.json());

app.get('/', function (req, res) {
  const filtroNombre = req.query.nombre;
  
  let genteFiltrada;

  if (filtroNombre) {
    genteFiltrada = gente.filter(g => {
      return g === filtroNombre;
    });
  } else {
    genteFiltrada = gente;
  }

  res.json(genteFiltrada);
});

app.get('/artist', (req, res) => {
  connection.query('SELECT * FROM artist', (error, resultado) => {
    if (error) {
      console.error(error);
      return;
    }

    res.json(resultado);
  });
});

app.post('/', function (req, res) {
  const body = req.body;
  gente.push(body.nombre);
  res.json({ message: 'Persona ingresada exitosamente', cantidadPersonas: gente.length });
});

app.put('/', function (req, res) {
  res.send('Este es el PuT');
})

app.delete('/', function (req, res) {
  const genteABorrar = req.query.nombre;
  if (!genteABorrar) {
    return res.json({ error: true, message: 'Tiene que enviar una persona a borrar' });
  }

  gente = gente.filter(g => {
    return g !== genteABorrar;
  });
  
  res.json({ message: 'Gente borrada exitosamente', cantidadPersonas: gente.length });
});

app.get('/contacto', function (req, res) {
  res.send('contacto');
});

app.listen(4000, () => {
  console.log('Aplicacion de express iniciada exitosamente');
});