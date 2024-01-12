import mongoose  from 'mongoose'
import { Schema } from "mongoose"

const PessoaDao = new Schema({
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
    rg: {
        type: String
    },
    cidadeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cidade',
        required: true
    },
    tipoSanguineoID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TipoSanguineo',
        required: true
    },
    criadoEm: {
        type: String
    },
    atualizadoEm:{
        type: String
    }
   
});

export default  mongoose.model("Pessoa", PessoaDao)