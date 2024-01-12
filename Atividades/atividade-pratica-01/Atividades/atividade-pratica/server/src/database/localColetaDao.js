import mongoose  from 'mongoose'
import { Schema } from "mongoose"

const LocalColetaDao = new Schema({
    nome: {
        type: String
    },
    rua: {
        type: String
    },
    numero: {
        type: Number
    },
    complemento: {
        type: String
    },
    cidadeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cidade',
        required: true
    },
    criadoEm: {
        type: String
    },
    atualizadoEm:{
        type: String
    }
   
});

export default  mongoose.model("LocalColeta", LocalColetaDao)