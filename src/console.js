require('./config/gemini');
const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');
const { processarMensagem } = require('./controllers/mensagemController');
const { inicializarBaseDeConhecimento } = require('./services/ragService');

const rl = readline.createInterface({ input, output });

async function iniciarChat() {
    console.log("Iniciando Sistema de Atendimento (Modo Console)...");
    await inicializarBaseDeConhecimento();
    console.log("Sistema pronto. Digite 'sair' para encerrar o chat.\n");

    const userIdFixoConsole = "usuario-console-001";
    let ativo = true;

    while (ativo) {
        const mensagem = await rl.question('Você: ');

        if (mensagem.toLowerCase() === 'sair') {
            console.log('Sistema encerrado.');
            rl.close();
            ativo = false;
            break;
        }

        const respostaFinal = await processarMensagem(userIdFixoConsole, mensagem);
        
        console.log(`\nAssistente: ${respostaFinal}\n`);
    }
}

iniciarChat();