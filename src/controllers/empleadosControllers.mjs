class EmpleadosController {
    constructor (){}
    consultar(req,res) {
    res.json({msg: ' Consulta Empleados'})
    }

    ingresar(req,res){
    res.json({msg: ' Crea un Empleado'})
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