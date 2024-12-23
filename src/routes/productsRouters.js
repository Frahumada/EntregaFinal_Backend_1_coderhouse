import {getProducts, getProductByID, createProduct, updateProduct, deleteProduct}  from "../controllers/products.controllers.js";
import { producValidator } from "../middlewares/productValidator.js";
import { Router } from "express";
import { __dirname } from "../path.js";

const productRouter = Router();

productRouter.post("/", producValidator,createProduct); //CREAR PRODUCT
productRouter.get("/", getProducts); //OBTENER PRODUCTS CON O SIN LIMITE DE PRODUCTS
productRouter.get("/:pid", getProductByID); //OBTENER PRODUCT BY ID
productRouter.put("/:pid", updateProduct); //ACTUALIZAR PRODUCT BY ID
productRouter.delete("/:pid", deleteProduct); //ELIMINAR PRODUCT BY ID

export default productRouter;
