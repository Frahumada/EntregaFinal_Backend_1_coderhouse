import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import cartRouter from './routes/cartRouter.js'
import productRouter from './routes/productsRouters.js';
import morgan from 'morgan';
import { __dirname } from './path.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { getProducts } from './controllers/products.controllers.js';


const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.engine('handlebars',handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


app.use('/api/carts/', cartRouter);
app.use('/api/products/', productRouter);
// app.use('/', productRouter);

app.use(errorHandler);

app.get('/', (req, res) => {
    res.status(200).render('templates-handlebars/home.handlebars', {js: 'productos.js', css: 'productos.css'})
});

const PORT = 8080;

await mongoose.connect("mongodb+srv://Frahumada_Admin:UyiKMmsUH7TO9QrM@frahumada.twiqt.mongodb.net/?retryWrites=true&w=majority&appName=Frahumada")
.then(()=>console.log("🟢 DB connected"))
.catch((e)=> console.log("🔴 Error connecting to MongoDB: "  + e.message))

app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto ${PORT}`);
});