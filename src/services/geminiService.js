const model = require('../config/gemini');

const chat = model.startChat({
    history: []
});

async function gerarResposta(mensagemCliente) {
    try {
        const result = await chat.sendMessage(mensagemCliente);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Erro na comunicação com a API do Gemini:", error);
        return "Desculpe, ocorreu uma falha na nossa comunicação interna. Tente novamente em instantes!";
    }
}

module.exports = { gerarResposta };