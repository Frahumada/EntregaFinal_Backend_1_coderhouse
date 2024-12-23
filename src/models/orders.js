import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    title: String,
    author: String,
    category: String,

})