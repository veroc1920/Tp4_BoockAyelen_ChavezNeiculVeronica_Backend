import db from "../database/conexion.mjs";

class ProveedoresController {
    constructor () { }
//Creamos los métodos para reemplazar las funciones en Routes
//GET
    async consultar(req, res) {
        const [filas] = await db.query('SELECT * FROM proveedores');

            res.status(200).json({
                total: filas.length,
                proveedores: filas
            });
       
    }
//POST
    async ingresar(req, res) {
        const { razon_social, nombre_contacto, telefono, email, direccion, cuit, condicion_iva } = req.body;

            if (!razon_social || !nombre_contacto || !telefono || !email || !direccion || !cuit || !condicion_iva) {
                return res.status(400).json({error: 'faltan campos obligatorios'});
            }
            
            const [resultado] = await db.query( 
                `INSERT INTO proveedores (razon_social, nombre_contacto, telefono, email, direccion, cuit, condicion_iva) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [razon_social, nombre_contacto, telefono, email, direccion, cuit, condicion_iva]
            );

            res.status (201).json({
                mensaje: 'Proveedor creado con éxito',
                id: resultado.insertId
            });
        
    }
    

 //GET id
    async consultarDetalle(req, res) {
        const { id } = req.params;

        const [filas] = await db.query('SELECT * FROM proveedores WHERE id = ?', [id]);

        if (filas.length === 0) {
                return res.status(404).json({ error: 'Proveedor no encontrado' });
            }

            res.status(200).json(filas[0]);

    }
//PUT
    async actualizar(req, res) {
        const { id } = req.params;
        const { razon_social, nombre_contacto, telefono, email, direccion, cuit, condicion_iva } = req.body;

        if (!razon_social || !nombre_contacto || !telefono || !email || !direccion || !cuit || !condicion_iva) {
                return res.status(400).json({error: 'faltan campos obligatorios'});
            }

            const [resultado] = await db.query(
                `UPDATE proveedores SET razon_social = ?, nombre_contacto = ?, telefono = ?, email = ?, direccion = ?, cuit = ?, condicion_iva = ? WHERE id = ?`,
                [razon_social, nombre_contacto, telefono, email, direccion, cuit, condicion_iva, id]
            );

            if (resultado.affectedRows === 0) {
                return res.status(404).json({ error: 'Proveedor no encontrado' });
            }

            const [filas] = await db.query('SELECT * FROM proveedores WHERE id = ?', [id]);

            res.status(200).json({
                mensaje: 'Proveedor actualizado con éxito',
                proveedor: filas[0]
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
            `UPDATE proveedores SET ${setClause} WHERE id = ?`, 
            values
            );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }

        const [filas] = await db.query('SELECT * FROM proveedores WHERE id = ?', [id]);
           
            res.status(200).json({
                mensaje: 'Proveedor actualizado con éxito',
                proveedor: filas[0]
            });
    };

    async eliminar(req, res) {
        const { id } = req.params;

        const [resultado] = await db.query(
            'DELETE FROM proveedores WHERE id = ?', 
            [id]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }

        res.status(200).json({ mensaje: 'Proveedor eliminado con éxito' });
    }

}

export default new ProveedoresController();