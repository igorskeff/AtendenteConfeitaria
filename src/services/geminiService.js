const model = require('../config/gemini');

const sessoesChat = new Map();

function obterSessaoChat(userId) {
    if (!sessoesChat.has(userId)) {
        sessoesChat.set(userId, model.startChat({ history: [] }));
    }
    return sessoesChat.get(userId);
}

async function gerarResposta(userId, prompt) {
    try {
        const chat = obterSessaoChat(userId);
        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Erro na comunicação com a API do Gemini:", error);
        return "Desculpe, ocorreu uma falha na nossa comunicação interna. Tente novamente em instantes!";
    }
}

module.exports = { gerarResposta };