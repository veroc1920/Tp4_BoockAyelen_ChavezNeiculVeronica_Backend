import db from "../database/conexion.mjs";

class ProductosController {
    constructor () { }
//Creamos los métodos para reemplazar las funciones en Routes
//GET
    async consultar(req, res) {
        const [filas] = await db.query('SELECT * FROM productos');

            res.status(200).json({
                total: filas.length,
                productos: filas
            });
       
    }
//POST
    async ingresar(req, res) {
        const { id_proveedor,nombre_producto, descripcion, precio  } = req.body;

            if (!id_proveedor || !nombre_producto || !descripcion || !precio) {
                return res.status(400).json({error: 'faltan campos obligatorios'});
            }
            
            const [resultado] = await db.query( 
                `INSERT INTO productos (id_proveedor, nombre_producto, descripcion, precio ) VALUES (?, ?, ?, ?)`,
                [id_proveedor, nombre_producto, descripcion, precio ]
            );

            res.status (201).json({
                mensaje: 'Producto creado con éxito',
                id: resultado.insertId
            });
        
    }
    

 //GET id
    async consultarDetalle(req, res) {
        const { id } = req.params;

        const [filas] = await db.query('SELECT * FROM productos WHERE id = ?', [id]);

        if (filas.length === 0) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            res.status(200).json(filas[0]);

    }
//PUT
    async actualizar(req, res) {
        const { id } = req.params;
        const { id_proveedor, nombre_producto, descripcion, precio } = req.body;

        if (!id_proveedor || !nombre_producto || !descripcion || !precio) {
                return res.status(400).json({error: 'faltan campos obligatorios'});
            }

            const [resultado] = await db.query(
                `UPDATE productos SET id_proveedor = ?, nombre_producto = ?, descripcion = ?, precio = ? WHERE id = ?`,
                [id_proveedor, nombre_producto, descripcion, precio, id]
            );

            if (resultado.affectedRows === 0) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            const [filas] = await db.query('SELECT * FROM productos WHERE id = ?', [id]);

            res.status(200).json({
                mensaje: 'Producto actualizado con éxito',
                producto: filas[0]
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
            `UPDATE productos SET ${setClause} WHERE id = ?`, 
            values
            );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const [filas] = await db.query('SELECT * FROM productos WHERE id = ?', [id]);
           
            res.status(200).json({
                mensaje: 'Producto actualizado con éxito',
                producto: filas[0]
            });
    };

    async eliminar(req, res) {
        const { id } = req.params;

        const [resultado] = await db.query(
            'DELETE FROM productos WHERE id = ?', 
            [id]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.status(200).json({ mensaje: 'Producto eliminado con éxito' });
    }

}

export default new ProductosController();