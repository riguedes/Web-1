import mongoose  from 'mongoose'
import { Schema } from "mongoose"

const EstadoDao = new Schema({
    nome: {
        type: String
    },
    sigla: {
        typeof: String
    },
    criadoEm: {
        type: String
    },
    atualizadoEm:{
        type: String
    }
   
});

export default  mongoose.model("Estado", EstadoDao);