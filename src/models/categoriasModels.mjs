import db from '../database/conexion.mjs'

class CategoriasModel {
    async obtenerTodos() { 
        return await db.query('SELECT * FROM categorias');
     }

    async crear({ nombre, descripcion }) {
        return await db.query( //db.query es un método de la conexión a la base de datos que ejecuta una consulta SQL. En este caso, se está utilizando para insertar un nuevo registro en la tabla "estudiantes". La consulta SQL se define como una cadena de texto y los valores a insertar se pasan como un arreglo en el segundo argumento del método. Esto permite que los valores sean escapados correctamente, evitando inyecciones SQL.
                `INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)`,//los ? son marcadores de posición que se reemplazarán con los valores proporcionados en el arreglo que sigue a la consulta. Esto ayuda a prevenir inyecciones SQL al asegurarse de que los valores se traten como datos y no como parte de la consulta SQL.
                [nombre, descripcion]
            );
    }

    async obtenerPorId(id) {
        return await db.query('SELECT * FROM categorias WHERE id_categoria = ?', [id]);
    }
    async actualizar(id, { nombre, descripcion }) { 
        return await db.query(
                `UPDATE categorias SET nombre = ?, descripcion = ? WHERE id_categoria = ?`,
                [nombre, descripcion, id]
            );
    }
    async eliminar(id) { 
        return await db.query(
                'DELETE FROM categorias WHERE id_categoria = ?', 
                [id]);
     }
    async actualizarParcial(id, campos) { 
        const keys = Object.keys(campos);
            console.log(`Keys: ${keys}`);

            const setClause = keys.map(key => `${key} = ?`).join(', ');
            
            const values = keys.map(key => campos[key]);
            values.push(id); 

            return await db.query(
                `UPDATE categorias SET ${setClause} WHERE id_categoria = ?`, 
                values
            );
     }
}

export default new CategoriasModel()