class ProductosController {
    constructor (){}
    consultar(req,res) {
    res.json({msg: ' Consulta Productos'})
    }

    ingresar(req,res){
    res.json({msg: ' Crea un Producto'})
    }

    consultarDetalle(req,res) {
    res.json({msg: ' Consulta un Productos'})
    }
    actualizar(req,res){
    res.json({msg: ' Actualización de  Producto'})
    }

    actualizarCampos(req,res){
    res.json({msg: ' Modifica datos de Producto'})
    }    
    eliminar(req,res){
    res.json({msg: ' Eliminar a un  Producto'})
    }
}
export default new ProductosController();