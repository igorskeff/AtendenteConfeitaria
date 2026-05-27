const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const embeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" });

async function gerarEmbedding(texto) {
    try {
        const result = await embeddingModel.embedContent(texto);
        return result.embedding.values;
    } catch (error) {
        console.error("Erro ao gerar a representação vetorial:", error);
        return null;
    }
}

module.exports = { gerarEmbedding };