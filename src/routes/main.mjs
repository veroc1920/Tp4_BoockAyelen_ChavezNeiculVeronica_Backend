import {Router} from "express";
import clientesRoutes from "./clientesRoutes.mjs"
import empleadosRoutes from "./empleadosRoutes.mjs"
import productosRoutes from "./productosRoutes.mjs"
import proveedoresRoutes from "./proveedoresRoutes.mjs"

const router = Router();

router.use("/api/clientes", clientesRoutes);
router.use("/api/empleados", empleadosRoutes);
router.use("/api/productos", productosRoutes);
router.use("/api/proveedores", proveedoresRoutes);

export default router;