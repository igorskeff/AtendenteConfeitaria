const fs = require('fs/promises');
const path = require('path');

const caminhoArquivo = path.join(__dirname, '../data/cardapio.json');

async function listarProdutos() {
    try {
        const dados = await fs.readFile(caminhoArquivo, 'utf-8');
        return JSON.parse(dados);
    } catch (erro) {
        console.error("Erro ao acessar o arquivo de cardápio:", erro);
        return [];
    }
}

module.exports = { listarProdutos };