const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const classificadorModel = genAI.getGenerativeModel({
    model: "gemini-flash-lite-latest",
    systemInstruction: `
Você é um classificador de intenções estrito. 
Analise a mensagem do usuário e retorne APENAS uma das seguintes palavras-chave, sem formatação extra: 
SAUDACAO, PRODUTO, OUTRO. 
Retorne 'SAUDACAO' para cumprimentos. 
Retorne 'PRODUTO' para dúvidas sobre o cardápio, preços, disponibilidade ou intenção de compra. 
Retorne 'OUTRO' para qualquer assunto não relacionado ao contexto de uma confeitaria.`,
    generationConfig: {
        temperature: 0.0
    }
});

async function classificarIntencao(mensagemCliente) {
    try {
        const result = await classificadorModel.generateContent(mensagemCliente);
        const resposta = await result.response;
        
        return resposta.text().trim().toUpperCase();
    } catch (error) {
        console.error("Erro na etapa de classificação de intenção:", error);
        return "OUTRO"; 
    }
}

module.exports = { classificarIntencao };