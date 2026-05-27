const { classificarIntencao } = require('../services/classificadorService');
const { gerarResposta } = require('../services/geminiService');
const { consultarProduto } = require('../services/ragService');
const { consultarDadosInstitucionais } = require('../services/estabelecimentoService');

async function processarMensagem(userId, mensagemCliente) {
    try {
        const intencao = await classificarIntencao(mensagemCliente);
        let respostaFinal = "";

        if (intencao === "SOCIAL") {
            respostaFinal = await gerarResposta(userId, mensagemCliente);
        } 
        else if (intencao === "PRODUTO") {
            respostaFinal = await consultarProduto(userId, mensagemCliente);
        } 
        else if (intencao === "INSTITUCIONAL") {
            respostaFinal = await consultarDadosInstitucionais(userId, mensagemCliente);
        }
        else {
            respostaFinal = "Sou o assistente da confeitaria. Como posso auxiliar com pedidos ou informações do nosso cardápio hoje?";
        }

        return respostaFinal;
    } catch (error) {
        console.error(`Erro ao processar mensagem do usuário ${userId}:`, error);
        return "Sinto muito, ocorreu um erro interno na nossa central. Por favor, tente novamente em instantes.";
    }
}

module.exports = { processarMensagem };