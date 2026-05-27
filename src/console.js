const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');
const { gerarResposta } = require('./services/geminiService');
const { classificarIntencao } = require('./services/classificadorService');

const rl = readline.createInterface({ input, output });

async function iniciarChat() {
    console.log("Sistema de Atendimento Iniciado (Modo Console).");
    console.log("Digite 'sair' para encerrar o chat.\n");

    let ativo = true;

    while (ativo) {
        const mensagem = await rl.question('Você: ');

        if (mensagem.toLowerCase() === 'sair') {
            console.log('Sistema encerrado.');
            rl.close();
            ativo = false;
            break;
        }

        console.log("Analisando intenção da mensagem...");
        const intencao = await classificarIntencao(mensagem);
        console.log(`[Log do Sistema - Intenção detectada: ${intencao}]`);

        let respostaFinal = "";

        if (intencao === "SAUDACAO") {
            respostaFinal = await gerarResposta(mensagem);
        } 
        else if (intencao === "PRODUTO") {
            // Este bloco será substituído futuramente pela lógica de RAG (Embeddings)
            respostaFinal = "[Módulo RAG] Compreendi que você deseja informações sobre um produto. O sistema realizará a busca no cardápio em breve.";
        } 
        else {
            respostaFinal = "Desculpe, sou um assistente focado no atendimento da confeitaria. Como posso ajudar com nosso cardápio ou pedidos hoje?";
        }
        
        console.log(`\nAssistente: ${respostaFinal}\n`);
    }
}

iniciarChat();