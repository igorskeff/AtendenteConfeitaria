function calcularSimilaridadeCossenos(vetorA, vetorB) {
    if (!vetorA || !vetorB || vetorA.length !== vetorB.length) {
        return 0;
    }

    let produtoEscalar = 0;
    let normaA = 0;
    let normaB = 0;

    for (let i = 0; i < vetorA.length; i++) {
        produtoEscalar += vetorA[i] * vetorB[i];
        normaA += vetorA[i] * vetorA[i];
        normaB += vetorB[i] * vetorB[i];
    }

    if (normaA === 0 || normaB === 0) {
        return 0;
    }

    return produtoEscalar / (Math.sqrt(normaA) * Math.sqrt(normaB));
}

module.exports = { calcularSimilaridadeCossenos };