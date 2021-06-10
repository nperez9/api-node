const express = require('express');
const mysql = require('mysql2');
const app = express();

const mysqlConfig = require('./config/config');

const connection = mysql.createConnection(mysqlConfig);

connection.connect((error) => {
  if (error) {
    console.error(error);
    process.exit();
  }
  console.log('conectado correctamente');
});

app.get('/api/health', function (req, res) {
  res.json({ message: 'App de login corriendo adecuadamente' });
});

app.listen(4500, () => {
  console.log('El servidor ya arranco');
});