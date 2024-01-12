import mongoose  from 'mongoose'
import { Schema } from "mongoose"

const DoacaoDao = new Schema({
    pessoaID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pessoa',
        required: true
    },
    localID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LocalColeta',
        required: true
    },
    data: {
        type: String
    },
    criadoEm: {
        type: String
    },
    atualizadoEm:{
        type: String
    }

   
});

export default  mongoose.model("Doacao", DoacaoDao);