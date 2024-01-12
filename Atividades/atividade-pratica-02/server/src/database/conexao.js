

import mongoose from 'mongoose';

import dotenv from 'dotenv'

dotenv.config()

const nome =  process.env.DB_NOME
const senha = process.env.DB_SENHA


const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://rian:Krh9MyNHAhxlu8cq@cluster0.0rpifmp.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );


    console.log('Conectado ao MongoDB com sucesso');
  } catch (error) {
    console.error('Erro ao conectar com o MongoDB:', error.message);
  }
};

connect();



export default connect