import db from "../database/conexion.mjs";
class EmpleadosController {
    constructor (){}
    async consultar(req,res) {
        try{
            const[filas]=await db.query(`SELECT* FROM empleados`);
            res.status(200).json({
                total: filas.length,
                empleados:filas
            });
        }catch (err){
            res.status(500).json({error:err.message});
        }
   
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
                    return res.status(400).json({error:'El Empleado ya está cargado'});
                    }
                    res.status(500).json({error: err.message});
                    }
                    }
    async consultarDetalle(req,res) {
        try{
            const{id}=req.params;
            const[filas]=await db.query (`SELECT * FROM empleados WHERE id= ?`, [id]);
            if(filas.length === 0){
                return res.status(404).json({error: "Empleado no encontrado"});
            }
            res.status(200).json(filas[0]);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
    async actualizar(req, res) {
    try {
        const { id } = req.params;
        const { nombre, apellido, fecha_de_nac, fecha_de_ingreso, dni, cuil, email, puesto } = req.body;

        
        if (!nombre || !apellido || !fecha_de_nac || !fecha_de_ingreso || !dni || !cuil || !puesto) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        const [resultado] = await db.query(
            `UPDATE empleados SET nombre=?, apellido=?, fecha_de_nac=?, fecha_de_ingreso=?, dni=?, cuil=?, email=?, puesto=? WHERE id_empleado = ?`,
            [nombre, apellido, fecha_de_nac, fecha_de_ingreso, dni, cuil, email, puesto, id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Empleado no encontrado" });
        }

        const [filas] = await db.query(`SELECT * FROM empleados WHERE id_empleado = ?`, [id]);
        
        res.status(200).json({
            mensaje: "Empleado actualizado con éxito",
            empleado: filas[0] 
        });
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}  

async actualizarParcial(req, res) {
    try {
        const { id } = req.params;
        const campos = req.body;
        console.log('Campos: ', campos);
        
        const keys = Object.keys(campos);
        console.log(`Keys: ${keys}`);
        
        if (keys.length === 0) {
            return res.status(400).json({ error: "No se enviaron campos para actualizar" });
        }

        const setClause = keys.map(key => `${key} = ?`).join(', ');
        console.log(`setClause: ${setClause}`);

        const values = keys.map(key => campos[key]);
        console.log(`values: ${values}`);

        values.push(id);

        const [resultado] = await db.query(
            `UPDATE empleados SET ${setClause} WHERE id_empleado = ?`,
            values
        );
        
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Empleado no encontrado" });
        }
        
        const [filas] = await db.query(`SELECT * FROM empleados WHERE id_empleado = ?`, [id]);
        res.status(200).json({
            mensaje: "Empleado actualizado parcialmente con éxito",
            empleado: filas[0]
        });

    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "El empleado ya se encuentra registrado" });
        }
        res.status(500).json({ error: err.message });
    }
    }

    async eliminar(req, res) {
    try {
        const { id } = req.params;

       
        const [resultado] = await db.query(
            `DELETE FROM empleados WHERE id_empleado = ?`,
            [id]
        );

        // Si no afectó filas, es porque el registro no existía en la base de datos
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Empleado no encontrado para eliminar" });
        }

        res.status(200).json({ mensaje: "Empleado eliminado con éxito" });

    } catch (err) {
        // si el registro está siendo usado en otra tabla (llave foránea)
        if (err.code === 'ER_ROW_IS_REFERENCED_2' || err.code === 'ER_ROW_IS_REFERENCED') {
            return res.status(400).json({ 
                error: "No se puede eliminar este registro porque tiene información asociada en otras tablas (ej. pedidos o productos)" 
            });
        }
        res.status(500).json({ error: err.message });
    }
}

}
export default new EmpleadosController();