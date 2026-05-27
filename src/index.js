require('dotenv').config();
const bot = require('./config/telegram');
const { processarMensagem } = require('./controllers/mensagemController');
const { inicializarBaseDeConhecimento } = require('./services/ragService');

// Mapas para gerenciar as filas e os temporizadores de cada usuário de forma isolada
const filaMensagens = new Map();
const temporizadores = new Map();

// Tempo de espera (em milissegundos) para o usuário parar de digitar
const TEMPO_DEBOUNCE = 2000; 

bot.on('text', async (ctx) => {
    const userId = ctx.from.id.toString(); 
    const novaMensagem = ctx.message.text;

    await ctx.sendChatAction('typing');

    if (!filaMensagens.has(userId)) {
        filaMensagens.set(userId, []);
    }
    filaMensagens.get(userId).push(novaMensagem);

    if (temporizadores.has(userId)) {
        clearTimeout(temporizadores.get(userId));
    }

    const timer = setTimeout(async () => {
        try {
            const mensagensAcumuladas = filaMensagens.get(userId).join('. ');
            
            filaMensagens.delete(userId);
            temporizadores.delete(userId);

            console.log(`[Lote Processado] Usuário ${userId}: "${mensagensAcumuladas}"`);

            const respostaFinal = await processarMensagem(userId, mensagensAcumuladas);
            
            await ctx.reply(respostaFinal, { parse_mode: 'HTML' });

        } catch (error) {
            console.error(`Erro ao processar lote do usuário ${userId}:`, error);
            await ctx.reply("Sinto muito, ocorreu uma instabilidade técnica. Pode repetir, por favor?");
        }
    }, TEMPO_DEBOUNCE);

    temporizadores.set(userId, timer);
});

async function iniciarServidor() {
    console.log("Inicializando base de conhecimento...");
    await inicializarBaseDeConhecimento();
    
    console.log("Iniciando bot do Telegram...");
    bot.launch();
    console.log("Sistema Operacional: Bot online e aguardando mensagens.");
}

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

iniciarServidor();