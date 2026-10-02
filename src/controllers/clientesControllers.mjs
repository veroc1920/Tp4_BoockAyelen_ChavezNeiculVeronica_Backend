class ClientesController {
    constructor (){}
    consultar(req,res) {
    res.json({msg: ' Consulta Cliente'})
    }

    ingresar(req,res){
    res.json({msg: ' Crea un Cliente'})
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