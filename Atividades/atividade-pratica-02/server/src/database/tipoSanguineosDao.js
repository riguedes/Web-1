import mongoose  from 'mongoose'
import { Schema } from "mongoose"

const TipoSanguineoDao = new Schema({
    tipo: {
        type: String
    },
    fator: {
        type: String
    },
    criadoEm: {
        type: String
    },
    atualizadoEm:{
        type: String
    }
   
});

export default  mongoose.model("TipoSanguineo", TipoSanguineoDao);