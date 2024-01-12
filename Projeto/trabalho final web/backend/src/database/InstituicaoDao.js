import mongoose  from 'mongoose'
import { Schema } from "mongoose"

const InstituicaoDao = new Schema({
    nome: {
        type: String
    },
    localizacao:{
        type: String
    },
    causa: {
        type: String
    },
    numeroVagasVoluntario:{
        type: Number
    },
    doacaoMinima: {
        type: Number
    }
});

export default  mongoose.model("Instituicao", InstituicaoDao);