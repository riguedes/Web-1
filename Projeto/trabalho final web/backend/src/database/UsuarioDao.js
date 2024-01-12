import mongoose from "mongoose";
import { Schema } from "mongoose";

const UsuarioDao = new Schema({
  nome: {
    type: String,
  },
  idade: {
    type: Number,
  },
  sexo: {
    type: String,
  },
  cpf: {
    type: String
  },
  email: {
    type: String
  },
  telefone: {
    type: String
  },
  cidade: {
    type: String
  },
  estado: {
    String
  }
});

export default mongoose.model("Usuario", UsuarioDao);
