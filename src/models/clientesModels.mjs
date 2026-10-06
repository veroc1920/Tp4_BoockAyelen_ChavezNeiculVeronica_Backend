import db from '../database/conexion.mjs'

class ClientesModel {
    async obtenerTodos() { 
        return await db.query('SELECT * FROM clientes');
     }

    async crear({ nombre, apellido, cuit, razon_social, direccion, telefono, email, dni, condicion_iva }) {
        return await db.query(
                `INSERT INTO clientes (nombre, apellido, cuit, razon_social, direccion, telefono, email, dni, condicion_iva) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [nombre, apellido, cuit, razon_social, direccion, telefono, email, dni, condicion_iva]
            );
     }
    async obtenerPorId(id) {
        return await db.query('SELECT * FROM clientes WHERE id_cliente = ?', [id]);
   }
    async actualizar(id, { nombre, apellido, cuit, razon_social, direccion, telefono, email, dni, condicion_iva }) { 
        return await db.query(
                `UPDATE clientes SET nombre = ?, apellido = ?, cuit = ?, razon_social = ?, direccion = ?, telefono = ?, email = ?, dni = ?, condicion_iva = ? WHERE id_cliente = ?`,
                [nombre, apellido, cuit, razon_social, direccion, telefono, email, dni, condicion_iva, id]
            );
    }
    async eliminar(id) { 
        return await db.query(
                'DELETE FROM clientes WHERE id_cliente = ?', 
                [id]);
     }
    async actualizarParcial(id, campos) { 
        const keys = Object.keys(campos);
            console.log(`Keys: ${keys}`);

            const setClause = keys.map(key => `${key} = ?`).join(', ');

            const values = keys.map(key => campos[key]);
            values.push(id); 

            return await db.query(
                `UPDATE clientes SET ${setClause} WHERE id_cliente = ?`, 
                values
            );
     }
}

export default new ClientesModel()