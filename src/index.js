require('./config/gemini');
const bot = require('./config/telegram');
const { processarMensagem } = require('./controllers/mensagemController');
const { inicializarBaseDeConhecimento } = require('./services/ragService');

bot.on('text', async (ctx) => {
    const userId = ctx.from.id.toString(); 
    const mensagemCliente = ctx.message.text;

    await ctx.sendChatAction('typing');

    const respostaFinal = await processarMensagem(userId, mensagemCliente);
    
    await ctx.reply(respostaFinal, { parse_mode: 'HTML' });
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