//Router central, importa todos los routers y los exporta para index.mjs

import {Router} from "express";
import categoriasRoutes from "./categoriasRoutes.mjs"
import companiasEnvioRoutes from "./companiasEnvioRoutes.mjs"
import clientesRoutes from "./clientesRoutes.mjs"
import empleadosRoutes from "./empleadosRoutes.mjs"
import pedidosRoutes from "./pedidosRoutes.mjs"
import productosRoutes from "./productosRoutes.mjs"
import proveedoresRoutes from "./proveedoresRoutes.mjs"

const router = Router();

router.use("/api/categorias", categoriasRoutes);
router.use("/api/companias", companiasEnvioRoutes);
router.use("/api/clientes", clientesRoutes);
router.use("/api/empleados", empleadosRoutes);
router.use("/api/pedidos", pedidosRoutes);
router.use("/api/productos", productosRoutes);
router.use("/api/proveedores", proveedoresRoutes);

export default router;