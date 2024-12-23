import cartModel from "../models/cart.model.js";

export const getCarts = async (req, res) => {
  try {
    const cart = await cartModel.find().lean();
    res.status(200).send(cart);
  } catch (error) {
    console.log("🔴🔴🔴 Error al obtener carrito: " + error.message);
    res
      .status(500)
      .send({ message: "Error al obtener carrito" }, error.message);
  }
};

export const getCartByID = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartModel.findById(cid).lean();
    res.status(200).render('partials/cart', {products: cart.products , js: 'carts.js', css: 'carts.css'})
  } catch (error) {
    console.log("🔴🔴🔴 Error al obtener carrito: " + error.message);
    console.log("Valor de error.message: ", error.message);
    res
      .status()
      .send(
        { message: "🔴🔴🔴 Error al obtener carrito por el id: " },
        error.message
      );
    // res.status(500).send({message: "Error al obtener carrito"}, error.message)
  }
};

export const createCart = async (req, res) => {
  try {
    const newCart = await cartModel.create({ products: [] });
    res.status(200).send({ message: "Carrito creado exitosamente" });
  } catch (error) {
    console.log("🔴🔴🔴 Error al crear carrito: " + error.message);
    res.status(500).send({ message: "Error al crear carrito" }, error.message);
  }
};

export const addProductToCart = async (req, res) => {
  try {
    console.log("Entre por el POST");
    const cid = req.params.cid;
    const pid = req.params.pid;
    const { quantity } = req.body;
    const cart = await cartModel.findOne({ _id: cid });
    if (cart) {
      const indice = cart.products.findIndex((prod) => prod.id_prod._id.toString() == pid.toString());
      if (indice != -1) {
        cart.products[indice].quantity += quantity;
      } else {
        cart.products.push({ id_prod: pid, quantity: quantity });
      }
      const mensaje = await cartModel.findByIdAndUpdate(cid, cart);
      res.status(200).send(mensaje);
    } else {
      res.status(404).send({ message: "El carrito no existe" });
    }
  } catch (error) {
    console.log("🔴🔴🔴 Error al crear carrito: " + error.message);
    res.status(500).send({ message: "Error al crear carrito" }, error.message);
  }
}; // Aca valido que no exista el producto, si existe le agrego el quantity

export const deleteProductCart = async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cart = await cartModel.findById({ _id: cid });
    const indice = cart.products.findIndex(
      (prod) => prod.id_prod._id.toString() == pid.toString()
    );
    if (indice != -1) {
      cart.products.splice(indice, 1);
      cart.save();
      res.status(200).send(cart);
    } else {
      res.status(404).send("Producto no existe");
    }
  } catch (error) {
    console.log(
      "🔴🔴🔴 Error al obtener producto a eliminar: " + error.message
    );
    res.status(500).send("Error al obtener producto a eliminar", error.message);
  }
};

export const deleteCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartModel.findOne({ _id: cartId });
    cart.products = [];
    cart.save();
    res.status(200).send(cart);
  } catch (error) {
    console.log("🔴🔴🔴 Error al obtener carrito: " + error.message);
    res
      .status(500)
      .send({ message: "Error al obtener carrito" }, error.message);
  }
};

export const updateProductsCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const { newProducts } = req.body;
    const cart = await cartModel.findById({ _id: cartId });
    cart.products = newProducts;
    cart.save();
    res.status(200).send(cart);
  } catch (error) {
    console.log(
      "🔴🔴🔴 Error al obtener producto a actualizar: " + error.message
    );
    res
      .status(500)
      .send(
        { message: "Error al obtener producto a actualizar" },
        error.message
      );
  }
};

export const updateQuantityProductToCart = async (req, res) => {
  try {
    console.log("Entre por el PUT");
    const cid = req.params.cid;
    const pid = req.params.pid;
    const { quantity } = req.body;
    const cart = await cartModel.findOne({ _id: cid });
    if (cart) {
        const indice = cart.products.findIndex((prod) => prod.id_prod._id.toString() == pid.toString());
        if (indice != -1) {
          cart.products[indice].quantity = quantity;
        } else {
          console.log("No se encontro producto")
        }
        const mensaje = await cartModel.findByIdAndUpdate(cid, cart);
        res.status(200).send(mensaje);
    } else {
        res.status(404).send({ message: "El carrito no existe" });
    }
  } catch (error) {
    console.log("🔴🔴🔴 Error al actualizar carrito: en el catch ", error.message);
    res.status(500).send("Error al obtener producto a eliminar", error.message);
  }
};
