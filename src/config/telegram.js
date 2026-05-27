require('dotenv').config();
const { Telegraf } = require('telegraf');

if (!process.env.TELEGRAM_TOKEN) {
    console.error("ERRO: TELEGRAM_TOKEN não encontrado no arquivo .env");
    process.exit(1);
}

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

module.exports = bot;