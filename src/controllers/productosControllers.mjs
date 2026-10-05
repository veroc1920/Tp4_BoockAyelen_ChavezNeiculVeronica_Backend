import db from "../database/conexion.mjs";

class ProductosController {
    constructor (){}
    async consultar(req,res) {
        try{
            const[filas]=await db.query(`SELECT* FROM productos`);
            res.status(200).json({
                total: filas.length,
                productos:filas
            });
        }catch (err){
            res.status(500).json({error:err.message});
        }
   
    }
    async ingresar(req,res){
        try{
            const {id_proveedor,id_categoria,nombre_producto,descripcion,precio,stock } = req.body;
            if ( !id_proveedor|| !id_categoria || !nombre_producto ||!descripcion||!precio||!stock ){
                return res.status(400).json({error: 'Faltan Campos Obligatorios'});
                }
            const [resultado]= await db.query(
                `INSERT INTO productos (id_proveedor,id_categoria,nombre_producto,descripcion,precio,stock) VALUES(?,?,?,?,?,?)`,
                [id_proveedor,id_categoria,nombre_producto,descripcion,precio,stock]
            );
            res.status(201).json({
                mensaje:'Producto creado con éxito',
                id:resultado.insertId  //mandar el ID
            });
            } catch(err){
                if(err.code === `ER_DUP_ENTRY`){
                    return res.status(400).json({error:'El producto ya se encuentra registrado'});
                    }
                    res.status(500).json({error: err.message});
                    }
                    }

    async consultarDetalle(req,res) {
        try{
            const{id}=req.params;
            const[filas]=await db.query (`SELECT * FROM productos WHERE id_producto= ?`, [id]);
            if(filas.length === 0){
                return res.status(404).json({error: "Producto no encontrado"});
            }
            res.status(200).json(filas[0]);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
    async actualizar(req, res) {
    try {
        const { id } = req.params;
        const { id_proveedor,id_categoria,nombre_producto,descripcion,precio,stock } = req.body;

        if (!id_proveedor||!id_categoria||!nombre_producto||precio===undefined||stock===undefined) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        
        const [resultado] = await db.query(
            `UPDATE productos SET  id_proveedor=?,id_categoria=?,nombre_producto=?,descripcion=?,precio=?,stock=? WHERE id_producto = ?`,
            [id_proveedor,id_categoria,nombre_producto,descripcion,precio,stock, id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "producto no encontrado" });
        }

        const [filas] = await db.query(`SELECT * FROM productos WHERE id_producto = ?`, [id]);
        
        res.status(200).json({
            mensaje: "Producto actualizado con éxito",
            producto: filas[0]
        });
        
    } catch (err) {
        res.status(500).json({ error: err.message });
     }
    }  
    async actualizarParcial(req,res){
        try{
            const {id}= req.params;
            const campos =req.body;
            console.log('Campos: ',campos);
            
            //obtener las claves  valores enviados en el body
            const keys=Object.keys(campos);
            console.log(`Keys: ${keys}`)
            
            if (keys.length === 0){
                return res.status(400).json({error: "No se enviaron campos para actualizar"});
            }
            //Construir dinamicamente el SET de la consulta (ej: nombre=?)
            const setClause =keys.map(key => `${key} =?`).join(', ');
            console.log(`setClause: ${setClause}`)

            const values =keys.map(key => campos[key]);
            console.log(`values: ${values}`)

            //Agregar el id al final del array de valores para la clausula  WHERE
            values.push(id);

            //UPDATE producto SET nombre=?

            const [resultado] = await db.query(
                `UPDATE productos SET ${setClause} WHERE id_producto= ?`,
                values
            );
            if(resultado.affectedRows === 0){
                return res.status(404).json({error: "Producto no encontrado"});
            }
            const [filas] = await db.query(`SELECT * FROM productos WHERE id_producto=?`,[id]);
            res.status(200).json({
                mensaje: "producto actualizado parcialmente con éxito",
                producto: filas[0]
            });

        }catch(err){
            if (err.code === `ER_DUP_ENTRY`){
                return res.status(400).json({error: "El producto ya se encuentra registrado"});
            }
            res.status(500).json({error:err.message});
        }
   
    }  
    async eliminar(req, res) {
    try {
        const { id } = req.params;

        
        const [resultado] = await db.query(
            `DELETE FROM productos WHERE id_producto = ?`,
            [id]
        );

        // Si no afectó filas, es porque el registro no existía en la base de datos
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Producto no encontrado para eliminar" });
        }

        res.status(200).json({ mensaje: "Producto eliminado con éxito" });

    } catch (err) {
        //  si el registro está siendo usado en otra tabla (llave foránea)
        if (err.code === 'ER_ROW_IS_REFERENCED_2' || err.code === 'ER_ROW_IS_REFERENCED') {
            return res.status(400).json({ 
                error: "No se puede eliminar este registro porque tiene información asociada en otras tablas (ej. pedidos o productos)" 
            });
        }
        res.status(500).json({ error: err.message });
    }
}

}
export default new ProductosController();