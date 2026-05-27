require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

if (!process.env.GEMINI_API_KEY) {
    console.error("ERRO: Chave GEMINI_API_KEY não encontrada no arquivo .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ 
    model: "gemini-flash-lite-latest",
    systemInstruction: "Atue como o assistente virtual de uma confeitaria. Suas respostas devem ser concisas e focadas no atendimento ao cliente."
});

module.exports = model;