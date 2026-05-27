const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Digite 'sair' para encerrar o chat.\n");

function iniciarChat() {
    rl.question('Você: ', async (mensagem) => {
        if (mensagem.toLowerCase() === 'sair') {
            console.log('Bot encerrado.');
            rl.close();
            return;
        }

        console.log(`Bot: Você disse "${mensagem}".`);

        iniciarChat();
    });
}

iniciarChat();