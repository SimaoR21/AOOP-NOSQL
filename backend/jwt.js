import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 
dotenv.config();  
// A chave secreta deve ser a mesma definida no .env
const secretKey = process.env.JWT_SECRET_KEY;
// Função para gerar o token JWT
export const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,  // Armazena o id do usuário no token
      role: user.role,   // Armazena o papel do usuário (admin/user)
    },
    secretKey,   // Chave secreta para assinar o token
    { expiresIn: '1h' }  // O token irá expirar em 1 hora
  );
};

// Função para verificar o token JWT
const verifyToken = (token) => {
  return jwt.verify(token, secretKey);  // Verifica e decodifica o token
};

// Exportando as funções usando export default
export default { generateToken, verifyToken };
