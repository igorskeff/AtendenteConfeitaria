const fs = require('fs/promises');
const path = require('path');

const caminhoCardapio = path.join(__dirname, '../data/cardapio.json');
const caminhoVetores = path.join(__dirname, '../data/vetores.json');

async function listarProdutos() {
    try {
        const dados = await fs.readFile(caminhoCardapio, 'utf-8');
        return JSON.parse(dados);
    } catch (erro) {
        console.error("Erro ao acessar o arquivo de cardápio:", erro);
        return [];
    }
}

async function listarVetores() {
    try {
        const dados = await fs.readFile(caminhoVetores, 'utf-8');
        return JSON.parse(dados);
    } catch (erro) {
        return [];
    }
}

async function salvarVetores(vetores) {
    try {
        // Salva os vetores de forma compactada (sem formatação de espaços) para otimizar armazenamento
        await fs.writeFile(caminhoVetores, JSON.stringify(vetores), 'utf-8');
    } catch (erro) {
        console.error("Erro ao salvar o arquivo de vetores:", erro);
    }
}

module.exports = { listarProdutos, listarVetores, salvarVetores };