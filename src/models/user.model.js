import { Schema, model } from "mongoose";
import { paginate } from "mongoose-paginate-v2";

const userSchema = new Schema({
    username: String,   //Agrego solo una caracteristica, es el tipo.
    email: {
        type: String,
        unique: true,
        index: true
    }
})
                            //nombre de coleccion y schema a utilizar
export const userModel = model("users", userSchema)

