class ProveedoresController {
    constructor (){}
    consultar(req,res) {
    res.json({msg: ' Consulta Proveedores'})
    }

    ingresar(req,res){
    res.json({msg: ' Crea un Proveedor'})
    }

    consultarDetalle(req,res) {
    res.json({msg: ' Consulta un Proveedor'})
    }
    actualizar(req,res){
    res.json({msg: ' Actualización de  Proveedor'})
    }

    actualizarCampos(req,res){
    res.json({msg: ' Modifica datos de Proveedor'})
    }    
    eliminar(req,res){
    res.json({msg: ' Eliminar a un  Proveedor'})
    }
}
export default new ProveedoresController();