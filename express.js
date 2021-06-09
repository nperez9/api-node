const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let gente = [
  'Berni',
  'Nico',
  'Dani',
  'Vane',
];

app.use(bodyParser.json());

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