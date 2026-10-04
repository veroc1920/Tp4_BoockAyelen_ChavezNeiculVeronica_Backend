import db from "../database/conexion.mjs";

class CategoriasController {
    constructor (){}
    async consultar(req,res) {
        try{
            const[filas]=await db.query(`SELECT* FROM categorias`);
            res.status(200).json({
                total: filas.length,
                categorias:filas
            });
        }catch (err){
            res.status(500).json({error:err.message});
        }
   
    }
async ingresar(req,res){
        try{
            const {nombre} = req.body;
            if ( !nombre){
                return res.status(400).json({error: 'Faltan Campos Obligatorios'});
                }
            const [resultado]= await db.query(
                `INSERT INTO categorias (nombre) VALUES(?)`,
                [nombre]
            );
            res.status(201).json({
                mensaje:'La categoria ha sido creada con éxito',
                id:resultado.insertId  //mandar el ID
            });
            } catch(err){
                if(err.code === `ER_DUP_ENTRY`){
                    return res.status(400).json({error:'La categoria ya se encuentra registrado'});
                    }
                    res.status(500).json({error: err.message});
                    }
                    }


    async consultarDetalle(req,res) {
        try{
            const{id}=req.params;
            const[filas]=await db.query (`SELECT * FROM categoria WHERE id= ?`, [id]);
            if(filas.length === 0){
                return res.status(404).json({error: "Categoria no encontrado"});
            }
            res.status(200).json(filas[0]);
        }catch(err){
            res.status(500).json({error: err.message});
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

            //UPDATE categorias SET nombre=?

            const [resultado] = await db.query(
                `UPDATE categorias SET ${setClause} WHERE id= ?`,
                values
            );
            if(resultado.affectedRows === 0){
                return res.status(404).json({error: "Categoria no encontrada"});
            }
            const [filas] = await db.query(`SELECT * FROM categorias WHERE id=?`,[id]);
            res.status(200).json({
                mensaje: "Categoria actualizada parcialmente con éxito",
                categoria: filas[0]
            });

        }catch(err){
            if (err.code === `ER_DUP_ENTRY`){
                return res.status(400).json({error: "La categoria ya se encuentra registrada"});
            }
            res.status(500).json({error:err.message});
        }
   
    }

    async actualizar(req,res){
        try{
            const {id} = req.params;
            const {nombre}= req.body;

            if(!nombre){
                return res.status(400).json({error: "Faltan campos obligatorios"});
            }
            const [resultado]= await db.query(
                `UPDATE categorias SET nombre=? WHERE id= ?`,
                [nombre,id]
            );
            if (resultado.affectedRows === 0){
                return res.status(404).json({error: "Categoria no encontrada"});
            }
                const [filas] = await db.query (`SELECT  * FROM categorias WHERE id=?`, [id]);
                res.status(200).json({
                    mensaje: "Categoria actualizada con éxito",
                    categoria: filas[0]
                });
            }catch (err){
                res.status(500).json({error: err.message});
            }
        }
    
    async eliminar(req, res) {
    try {
        const { id } = req.params;

        
        const [resultado] = await db.query(
            `DELETE FROM categorias WHERE id = ?`,
            [id]
        );

        // Si no afectó filas, es porque el registro no existía en la base de datos
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Categoria no encontrada para eliminar" });
        }

        res.status(200).json({ mensaje: "Categoria eliminada con éxito" });

    } catch (err) {
        //  si el registro está siendo usado en otra tabla (llave foránea)
        if (err.code === 'ER_ROW_IS_REFERENCED_2' || err.code === 'ER_ROW_IS_REFERENCED') {
            return res.status(400).json({ 
                error: "No se puede eliminar esta categoria porque tiene información asociada en otras tablas (ej. pedidos o productos)" 
            });
        }
        res.status(500).json({ error: err.message });
    }
}

}
export default new CategoriasController();