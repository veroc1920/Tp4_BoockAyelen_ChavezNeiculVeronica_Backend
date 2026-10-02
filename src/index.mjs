//require('dotenv').config();
//const express = require('express');
import express from "express";
import proveedoresRoutes from './routes/proveedoresRoutes.mjs';
import clientesRoutes from './routes/clientesRoutes.mjs';
import productosRoutes from './routes/productosRoutes.mjs';
import empleadosRoutes from "./routes/empleadosRoutes.mjs";

const app = express();
app.use(express.json());
app.use('/proveedores',proveedoresRoutes)
app.use('/clientes',clientesRoutes)
app.use('/productos',productosRoutes)
app.use('/empleados',empleadosRoutes)
//app.get('/', (req, res) => res.json({ ok: true, data: 'API Distribuidora funcionando' }));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
//app.listen(3000, () =>{
  //  console.log('Servidor activo')
//})