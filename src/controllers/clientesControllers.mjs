import db from "../database/conexion.mjs";
class ClientesController {
    constructor (){}
    consultar(req,res) {
    res.json({msg: ' Consulta Cliente'})
    }

    async ingresar(req,res){
        try{
            const {nombre,apellido,cuit,razon_social,direccion,telefono,email,dni,condicion_iva} = req.body;
            if ( !nombre||!apellido || !cuit || !razon_social || !direccion || !telefono || !email || !dni || !condicion_iva){
                return res.status(400).json({error: 'Faltan Campos Obligatorios'});
                }
            const [resultado]= await db.query(
                `INSERT INTO clientes (nombre,apellido,cuit,razon_social,direccion,telefono,email,dni,condicion_iva) VALUES(?,?,?,?,?,?,?,?,?)`,
                [nombre,apellido,cuit,razon_social,direccion,telefono,email,dni,condicion_iva]
            );
            res.status(201).json({
                mensaje:'Cliente creado con éxito',
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
    res.json({msg: ' Consulta un Cliente'})
    }
    actualizar(req,res){
    res.json({msg: ' Actualización de  Cliente'})
    }

    actualizarCampos(req,res){
    res.json({msg: ' Modifica datos de Cliente'})
    }    
    eliminar(req,res){
    res.json({msg: ' Eliminar a un  Cliente'})
    }
}
export default new ClientesController();