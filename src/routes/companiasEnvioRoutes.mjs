import express from "express";
import companiasEnvioControllers from "../controllers/companiasEnvioControllers.mjs";


const router = express.Router();

//Métodos GET
router.get('/', companiasEnvioControllers.consultar)
//Método POST
router.post('/', companiasEnvioControllers.ingresar) 

//Métodos con /:id 
router.route('/:id')
 .put(companiasEnvioControllers.actualizar)  //Método  PUT

//Método Get id
 .get(companiasEnvioControllers.consultarDetalle)

//Método PATCH
 .patch(companiasEnvioControllers.actualizarParcial )

//Método DELETE
 .delete(companiasEnvioControllers.eliminar)

export default router;