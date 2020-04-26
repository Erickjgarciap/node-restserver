 require('./config/config');
 const express = require('express');
 const mongoose = require('mongoose');
 const path = require('path');
 const app = express();


 const bodyParser = require('body-parser');

 app.use(express.static(path.resolve(__dirname, '../public')));
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());

 //configuracion global de rutas
 app.use(require('./routes/index'));

 mongoose.connect(process.env.URLDB, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err, res) => {

     if (err) throw err;
     console.log('Base de datos online');
 });
 app.listen(process.env.PORT, () => {
     console.log("Escuchando");
 });