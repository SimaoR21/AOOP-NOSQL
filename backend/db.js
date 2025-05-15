import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    // Verifique se a variável de ambiente foi carregada corretamente
    if (!process.env.MONGO_URI) {
        console.error('Erro: MONGO_URI não está definido!');
        process.exit(1);
    }

    try {
        console.log('Tentando conectar ao MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB conectado com sucesso!");
    } catch (err) {
        console.error("Erro ao conectar à base de dados:", err.message);
        process.exit(1);
    }
};

export default connectDB;

