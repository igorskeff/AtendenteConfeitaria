const { gerarEmbedding } = require('./embeddingService');
const { calcularSimilaridadeCossenos } = require('../utils/matematica');
const { listarProdutos, listarVetores, salvarVetores } = require('../repositories/produtoRepository');
const { gerarResposta } = require('./geminiService');

const model = require('../config/gemini');

let baseDeConhecimento = [];

async function inicializarBaseDeConhecimento() {
    console.log("[Inicialização] Carregando metadados e índices vetoriais...");
    
    const produtos = await listarProdutos();
    const vetores = await listarVetores();
    let houveAtualizacao = false;

    for (const produto of produtos) {
        let registroVetor = vetores.find(v => v.id === produto.id);

        if (!registroVetor) {
            console.log(`[Processamento] Gerando novo vetor dimensional para: ${produto.nome}`);
            
            const textoParaVetorizar = `Produto: ${produto.nome}. Descrição: ${produto.descricao}. Categoria: ${produto.categoria}. Preço: R$ ${produto.preco.toFixed(2)}.`;
            const vetorGerado = await gerarEmbedding(textoParaVetorizar);

            if (vetorGerado) {
                registroVetor = { id: produto.id, vetor: vetorGerado };
                vetores.push(registroVetor);
                houveAtualizacao = true;
            }
        }
        
        if (registroVetor) {
            baseDeConhecimento.push({ ...produto, vetor: registroVetor.vetor });
        }
    }

    if (houveAtualizacao) {
        console.log("[Inicialização] Salvando atualização no banco vetorial...");
        await salvarVetores(vetores);
    }

    console.log("[Inicialização] Arquitetura de base de conhecimento carregada com sucesso.");
}

async function consultarProduto(mensagemCliente) {
    if (baseDeConhecimento.length === 0) {
        return "O sistema ainda está carregando o cardápio. Por favor, aguarde um instante.";
    }

    // Gera o embedding da pergunta
    const vetorPergunta = await gerarEmbedding(mensagemCliente);
    if (!vetorPergunta) return "Ocorreu um erro ao processar sua solicitação.";

    // Faz o calculo de similaridade com cada produto
    const resultados = baseDeConhecimento.map(produto => {
        const similaridade = calcularSimilaridadeCossenos(vetorPergunta, produto.vetor);
        return { ...produto, similaridade };
    });

    // Ordena em ordem de similaridade e pega os 3 primeiros
    resultados.sort((a, b) => b.similaridade - a.similaridade);
    const topResultados = resultados.slice(0, 3);

    const contextoFormatado = topResultados.map(p => 
        `- ${p.nome}: ${p.descricao} (Valor: R$ ${p.preco.toFixed(2)}). Link direto para compra: ${p.link_pedido}`
    ).join('\n');

    const promptRAG = `
        Utilize EXCLUSIVAMENTE as informações do cardápio listadas abaixo para atender à solicitação ou responder à mensagem do cliente.
        Se o produto desejado não estiver contido nas informações fornecidas, informe educadamente que não temos essa opção no momento.

        [Diretriz de Venda]: 
        - Se o cliente perguntar sobre um produto, apresente-o de forma atraente.
        - Se o cliente demonstrar intenção de compra, aceitar um produto ou perguntar como pedir, forneça IMEDIATAMENTE o respectivo "Link direto para compra" listado no cardápio.
        - NUNCA se ofereça para anotar o pedido, fazer reservas ou fechar a compra internamente no chat. Sua única função na venda é fornecer o link para o cliente concluir a transação.

        [Cardápio Recuperado]:
        ${contextoFormatado}

        [Mensagem do Cliente]: "${mensagemCliente}"
    `;

   return await gerarResposta(promptRAG)
}

module.exports = { inicializarBaseDeConhecimento, consultarProduto };