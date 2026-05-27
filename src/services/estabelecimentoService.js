const { obterDadosEstabelecimento } = require('../repositories/estabelecimentoRepository');
const { gerarResposta } = require('./geminiService');

async function consultarDadosInstitucionais(mensagemCliente) {
    const dados = await obterDadosEstabelecimento();
    
    if (!dados) {
        return "Desculpe, não consegui acessar as informações da empresa no momento.";
    }

    const promptInstitucional = `
        Utilize EXCLUSIVAMENTE as informações institucionais listadas abaixo para responder à mensagem do cliente.
        Se a informação solicitada não estiver explicitamente contida nos dados abaixo, informe educadamente que não possui essa informação.

        [Dados Oficiais do Estabelecimento]:
        - Endereço: ${dados.endereco}
        - Horário de Funcionamento: ${dados.horario_funcionamento}
        - Contato/Canais de atendimento: ${dados.contato}

        [Mensagem do Cliente]: "${mensagemCliente}"
    `;

    return await gerarResposta(promptInstitucional);
}

module.exports = { consultarDadosInstitucionais };