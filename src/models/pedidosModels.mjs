import db from '../database/conexion.mjs'

class PedidosModel {
    async obtenerTodos() { 
        return await db.query(`
            SELECT p.*,
                   c.nombre AS cliente_nombre,
                   c.apellido AS cliente_apellido,
                   e.nombre AS empleado_nombre,
                   e.apellido AS empleado_apellido,
                   ce.nombre AS compania_nombre
            FROM pedidos p
            JOIN clientes c ON p.id_cliente = c.id_cliente
            JOIN compania_envio ce ON p.id_compania = ce.id_compania
            JOIN empleados e ON p.id_empleado = e.id_empleado
            `);
     }

    async crear({ id_cliente, id_empleado, id_compania, total= 0, estado = 'Pendiente' }) {
        return await db.query( 
                `INSERT INTO pedidos (id_cliente, id_empleado, id_compania, total, estado) VALUES (?, ?, ?, ?, ?)`,
                [id_cliente, id_empleado, id_compania, total, estado]
            );
    }

    async obtenerPorId(id) {
        return await db.query(`
            SELECT p.*,
                   c.nombre AS cliente_nombre,
                   c.apellido AS cliente_apellido,
                   e.nombre AS empleado_nombre,
                   e.apellido AS empleado_apellido,
                   ce.nombre AS compania_nombre
            FROM pedidos p
            JOIN clientes c ON p.id_cliente = c.id_cliente
            JOIN compania_envio ce ON p.id_compania = ce.id_compania
            JOIN empleados e ON p.id_empleado = e.id_empleado
             WHERE p.id_pedido = ?`, [id]);
    }

    async obtenerDetalle(id) {
        return await db.query(`
            SELECT d.id_detalle,
                   d.id_producto,
                   pr.nombre_producto,
                   d.cantidad,
                   d.precio_unitario,
                   d.cantidad * d.precio_unitario AS subtotal
            FROM detalles_pedidos d
            JOIN productos pr ON d.id_producto = pr.id_producto
            WHERE d.id_pedido = ?`, [id]);
    }

    async actualizar(id, { id_cliente, id_empleado, id_compania, total, estado }) { 
        return await db.query(
                `UPDATE pedidos SET id_cliente = ?, id_empleado = ?, id_compania = ?, total = ?, estado = ? WHERE id_pedido = ?`,
                [id_cliente, id_empleado, id_compania, total, estado, id]
            );
    }
    async eliminar(id) { 
        return await db.query(
                'DELETE FROM pedidos WHERE id_pedido = ?', 
                [id]);
     }
    async actualizarParcial(id, campos) { 
        const keys = Object.keys(campos);
            console.log(`Keys: ${keys}`);


            const setClause = keys.map(key => `${key} = ?`).join(', ');
            
            const values = keys.map(key => campos[key]);
            values.push(id); 

            return await db.query(
                `UPDATE pedidos SET ${setClause} WHERE id_pedido = ?`, 
                values
            );
     }
}

export default new PedidosModel()