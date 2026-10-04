//require('dotenv').config();
//const express = require('express');
import express from "express";
import router from "./src/routes/main.mjs";
import rutaNoEncontrada from "./src/middlewares/rutaNoEncontrada.mjs";
import manejoErrores from "./src/middlewares/manejoErrores.mjs";


const app = express();
app.use(express.json());
app.use(router);
app.use(rutaNoEncontrada);
app.use(manejoErrores);
//app.get('/', (req, res) => res.json({ ok: true, data: 'API Distribuidora funcionando' }));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
//app.listen(3000, () =>{
  //  console.log('Servidor activo')
//})