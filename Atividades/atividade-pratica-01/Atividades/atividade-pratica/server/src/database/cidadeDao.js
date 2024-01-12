import mongoose  from 'mongoose'
import { Schema } from "mongoose"

const CidadeDao = new Schema({
    nome: {
        type: String
    },
    estadoID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estado',
        required: true
    },
    criadoEm: {
        type: String
    },
    atualizadoEm:{
        type: String
    }
   
});

export default  mongoose.model("Cidade", CidadeDao);