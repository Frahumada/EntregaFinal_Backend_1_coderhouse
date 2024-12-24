import productModel from "../models/product.model.js"

export const getProducts = async (req, res) => {
    try {
        const {limit, page, filter, metFilter, ord} = req.query;

        const pagina = page !== undefined ? page : 1;
        const limite = limit !== undefined ? limit : 2;
        const query = metFilter !== undefined ? {[metFilter] : filter} : {};
        const orderQuery = ord !== undefined ? {price : ord} : {}

        
        const products = await productModel.paginate(query , {limit: limite, page: pagina, orderQuery, lean: true});

        res.status(200).render('templates-handlebars/home', {productos: products.docs, js: 'products.js', css: 'products.css'})

    } catch (error) {
        console.log("🔴🔴🔴 Error al consultar product: " + error.message)
        res.status(500).send({message: "🔴🔴🔴 Error al consultar product: "}, error.message)
    }

}

export const getProductByID = async (req, res) => {
    try {
        const idProd = req.params.pid
        const product = await productModel.findById(idProd).lean()
        if (product) {
            res.status(200).send(product)
        }
        else {
            res.status(404).send({message: 'Product not found'});
        }
    } catch (error) {
        console.log("🔴🔴🔴 Error al consultar product By ID: " + error.message)
        res.status(500).send({message: "🔴🔴🔴 Error al consultar product By ID: "}, error.message)
    }
}

export const createProduct = async (req, res) => {
    try {
        const product = req.body;
        const respuesta = await productModel.create(product);
        res.status(201).send({message: "Producto creado correctamente"})
    } catch (error) {
        console.log("🔴🔴🔴 Error al crear producto: " + error.message)
        res.status(500).send({message: "Error al crear producto"}, error.message)

    }
}

export const updateProduct = async (req, res) => {
    try {
        const idprod = req.params.pid;
        const updateProduct = req.body;
        const respuesta = await productModel.findByIdAndUpdate(idprod, updateProduct);
        res.status(200).send({message: "Producto actualizado correctamente"})
    } catch (error) {
        console.log("🔴🔴🔴 Error al actualizar producto: " + error.message)
        res.status(500).send({message: "Error al actualizar producto"}, error.message)
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const idprod = req.params.pid;
        const respuesta = await productModel.findByIdAndDelete(idprod);
        res.status(200).send({message: "Producto eliminado correctamente"}, respuesta)
    } catch (error) {
        console.log("🔴🔴🔴 Error al eliminar producto: " + error.message)
        res.status(500).send({message: "Error al eliminar producto"}, error.message)
    }
}

