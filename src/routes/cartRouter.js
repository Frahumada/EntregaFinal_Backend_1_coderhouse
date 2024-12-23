import {
  getCartByID,
  createCart,
  addProductToCart,
  getCarts,
  deleteProductCart,
  deleteCart,
  updateProductsCart,
  updateQuantityProductToCart,
} from "../controllers/carts.controllers.js";
import { Router } from "express";
import { __dirname } from "../path.js";

const cartRouter = Router();

cartRouter.post("/", createCart);
cartRouter.get("/:cid", getCartByID);
cartRouter.get("/", getCarts);
cartRouter.post("/:cid/product/:pid", addProductToCart);

cartRouter.put("/:cid", updateProductsCart);
cartRouter.put("/:cid/product/:pid", updateQuantityProductToCart);
cartRouter.delete("/:cid", deleteCart);
cartRouter.delete("/:cid/product/:pid", deleteProductCart);

deleteProductCart;
deleteCart;
updateProductsCart;
updateQuantityProductToCart;

export default cartRouter;
