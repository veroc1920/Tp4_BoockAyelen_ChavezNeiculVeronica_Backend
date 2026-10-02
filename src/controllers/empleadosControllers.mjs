import db from "../database/conexion.mjs";
class EmpleadosController {
    constructor (){}
    consultar(req,res) {
    res.json({msg: ' Consulta Empleados'})
    }
   
    async ingresar(req,res){
        try{
            const {nombre,apellido,fecha_de_nac,fecha_de_ingreso,dni,cuil,email,puesto} = req.body;
            if ( !nombre||!apellido || !fecha_de_nac || !fecha_de_ingreso || !dni || !cuil || !email || !puesto ){
                return res.status(400).json({error: 'Faltan Campos Obligatorios'});
                }
            const [resultado]= await db.query(
                `INSERT INTO empleados (nombre,apellido,fecha_de_nac,fecha_de_ingreso,dni,cuil,email,puesto) VALUES(?,?,?,?,?,?,?,?)`,
                [nombre,apellido,fecha_de_nac,fecha_de_ingreso,dni,cuil,email,puesto]
            );
            res.status(201).json({
                mensaje:'Empleado creado con éxito',
                id:resultado.insertId  //mandar el ID
            });
            } catch(err){
                if(err.code === `ER_DUP_ENTRY`){
                    return res.status(400).json({error:'El Documento de identidad ya está cargado'});
                    }
                    res.status(500).json({error: err.message});
                    }
                    }
    consultarDetalle(req,res) {
    res.json({msg: ' Consulta un Empleado'})
    }
    actualizar(req,res){
    res.json({msg: ' Actualización de  Empleado'})
    }

    actualizarCampos(req,res){
    res.json({msg: ' Modifica datos de Empleado'})
    }    
    eliminar(req,res){
    res.json({msg: ' Eliminar a un  Empleado'})
    }
}
export default new EmpleadosController();