const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');
const { gerarResposta } = require('./services/geminiService');
const { classificarIntencao } = require('./services/classificadorService');
const { inicializarBaseDeConhecimento, consultarProduto } = require('./services/ragService');
const { consultarDadosInstitucionais } = require('./services/estabelecimentoService');

const rl = readline.createInterface({ input, output });

async function iniciarChat() {
    console.log("Iniciando Sistema de Atendimento (Modo Console)...");
    
    await inicializarBaseDeConhecimento();
    
    console.log("Sistema pronto. Digite 'sair' para encerrar o chat.\n");

    let ativo = true;

    while (ativo) {
        const mensagem = await rl.question('Você: ');

        if (mensagem.toLowerCase() === 'sair') {
            console.log('Sistema encerrado.');
            rl.close();
            ativo = false;
            break;
        }

        const intencao = await classificarIntencao(mensagem);
        
        let respostaFinal = "";

        if (intencao === "SOCIAL") {
            respostaFinal = await gerarResposta(mensagem);
        } 
        else if (intencao === "PRODUTO") {
            respostaFinal = await consultarProduto(mensagem);
        } 
        else if (intencao === "INSTITUCIONAL") {
            respostaFinal = await consultarDadosInstitucionais(mensagem);
        }
        else {
            respostaFinal = "Sou o assistente da confeitaria. Como posso auxiliar com pedidos ou informações do nosso cardápio hoje?";
        }
        
        console.log(`\nAssistente: ${respostaFinal}\n`);
    }
}

iniciarChat();