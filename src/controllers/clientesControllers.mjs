import db from "../database/conexion.mjs";
class ClientesController {
    constructor (){}
    async consultar(req,res) {
        try{
            const[filas]=await db.query(`SELECT* FROM clientes`);
            res.status(200).json({
                total: filas.length,
                clientes:filas
            });
        }catch (err){
            res.status(500).json({error:err.message});
        }
   
    }

    async ingresar(req,res){
        try{
            const {nombre,apellido,cuit,razon_social,direccion,telefono,email,dni,condicion_iva} = req.body;
            if ( !nombre||!apellido || !cuit || !razon_social || !direccion || !telefono || !email || !dni || !condicion_iva){
                return res.status(400).json({error: 'Faltan Campos Obligatorios'});
                }
            const [resultado]= await db.query(
                `INSERT INTO clientes (nombre,apellido,cuit,razon_social,direccion,telefono,email,dni,condicion_iva) VALUES(?,?,?,?,?,?,?,?,?)`,
                [nombre,apellido,cuit,razon_social,direccion,telefono,email,dni,condicion_iva]
            );
            res.status(201).json({
                mensaje:'Cliente creado con éxito',
                id:resultado.insertId  //mandar el ID
            });
            } catch(err){
                if(err.code === `ER_DUP_ENTRY`){
                    return res.status(400).json({error:'Este cliente ya está cargado'});
                    }
                    res.status(500).json({error: err.message});
                    }
                    }
    async consultarDetalle(req,res) {
        try{
            const{id}=req.params;
            const[filas]=await db.query (`SELECT * FROM clientes WHERE id= ?`, [id]);
            if(filas.length === 0){
                return res.status(404).json({error: "Cliente no encontrado"});
            }
            res.status(200).json(filas[0]);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
    async actualizar(req, res) {
    try {
        const { id } = req.params;
        const { nombre,apellido,cuit,razon_social,direccion,telefono,email,dni,condicion_iva } = req.body;

        if (!nombre||!apellido || !cuit || !razon_social || !direccion || !telefono || !email || !dni || !condicion_iva) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        
        const [resultado] = await db.query(
            `UPDATE clientes SET nombre=?, apellido=?, cuit=?, razon_social=?, direccion=?, telefono=?, email=?, dni=?, condicion_iva=? WHERE id_cliente = ?`,
            [nombre,apellido ,cuit ,razon_social ,direccion ,telefono,email ,dni ,condicion_iva, id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "cliente no encontrado" });
        }

        const [filas] = await db.query(`SELECT * FROM clientes WHERE id_cliente = ?`, [id]);
        
        res.status(200).json({
            mensaje: "Cliente actualizado con éxito",
            cliente: filas[0]
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

            //UPDATE clientes SET nombre=?

            const [resultado] = await db.query(
                `UPDATE clientes SET ${setClause} WHERE id_cliente= ?`,
                values
            );
            if(resultado.affectedRows === 0){
                return res.status(404).json({error: "Cliente no encontrado"});
            }
            const [filas] = await db.query(`SELECT * FROM clientes WHERE id_cliente=?`,[id]);
            res.status(200).json({
                mensaje: "Cliente actualizado parcialmente con éxito",
                cliente: filas[0]
            });

        }catch(err){
            if (err.code === `ER_DUP_ENTRY`){
                return res.status(400).json({error: "El cliente ya se encuentra registrado"});
            }
            res.status(500).json({error:err.message});
        }
   
    }
    eliminar(req,res){
    res.json({msg: ' Eliminar a un  Cliente'})
    }
}
export default new ClientesController();