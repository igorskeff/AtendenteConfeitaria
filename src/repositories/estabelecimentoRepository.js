const fs = require('fs/promises');
const path = require('path');

const caminhoArquivo = path.join(__dirname, '../data/estabelecimento.json');

async function obterDadosEstabelecimento() {
    try {
        const dados = await fs.readFile(caminhoArquivo, 'utf-8');
        return JSON.parse(dados);
    } catch (erro) {
        console.error("Erro ao acessar o arquivo institucional:", erro);
        return null;
    }
}

module.exports = { obterDadosEstabelecimento };