import db from "../database/conexion.mjs";
class EmpleadosController {
    constructor (){}
    
    //GET
    async consultar(req, res) {
        const [filas] = await db.query('SELECT * FROM empleados');

            res.status(200).json({
                total: filas.length,
                empleados: filas
            });    
    }

//POST
    async ingresar(req,res){
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
    }

    //GET id
    async consultarDetalle(req, res) {
        const { id } = req.params;

        const [filas] = await db.query('SELECT * FROM empleados WHERE id = ?', [id]);

        if (filas.length === 0) {
                return res.status(404).json({ error: 'Empleado no encontrado' });
            }

            res.status(200).json(filas[0]);

    }
//PUT
    async actualizar(req, res) {
        const { id } = req.params;
        const { nombre,apellido,fecha_de_nac,fecha_de_ingreso,dni,cuil,email,puesto } = req.body;

        if (!nombre || !apellido || !fecha_de_nac || !fecha_de_ingreso || !dni || !cuil || !email || !puesto) {
                return res.status(400).json({error: 'faltan campos obligatorios'});
            }

            const [resultado] = await db.query(
                `UPDATE empleados SET nombre = ?, apellido = ?, fecha_de_nac = ?, fecha_de_ingreso = ?, dni = ?, cuil = ?, email = ?, puesto = ? WHERE id = ?`,
                [nombre,apellido,fecha_de_nac,fecha_de_ingreso,dni,cuil,email,puesto, id]
            );

            if (resultado.affectedRows === 0) {
                return res.status(404).json({ error: 'Empleado no encontrado' });
            }

            const [filas] = await db.query('SELECT * FROM empleados WHERE id = ?', [id]);

            res.status(200).json({
                mensaje: 'Empleado actualizado con éxito',
                empleado: filas[0]
            });
           
    }
//PATCH
    async actualizarCampos(req, res) {
        const { id } = req.params;
        const campos = req.body;
       

        //Obtener las claves y valores enviados en el body
        const keys = Object.keys(campos);
        

        if (keys.length === 0) {
            return res.status(400).json({ error: 'No se proporcionaron campos para actualizar' });
        }

        //Construimos la consulta SQL dinámicamente
        const setClause = keys.map(key => `${key} = ?`).join(', ');
        

        const values = keys.map(key => campos[key]);
       
        values.push(id); // Agregamos el id al final de los valores del array para la cláusula WHERE

        //`UPDATE 
        const [resultado] = await db.query(
            `UPDATE empleados SET ${setClause} WHERE id = ?`, 
            values
            );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }

        const [filas] = await db.query('SELECT * FROM empleados WHERE id = ?', [id]);
           
            res.status(200).json({
                mensaje: 'Empleado actualizado con éxito',
                empleado: filas[0]
            });
    };

    async eliminar(req, res) {
        const { id } = req.params;

        const [resultado] = await db.query(
            'DELETE FROM empleados WHERE id = ?', 
            [id]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }

        res.status(200).json({ mensaje: 'Empleado eliminado con éxito' });
    }

}

export default new EmpleadosController();