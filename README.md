# Assistente Virtual Inteligente - Confeitaria

Este projeto é um chatbot de atendimento automatizado para o Telegram, desenvolvido com Node.js e integrado à inteligência artificial generativa (Gemini API) utilizando a arquitetura Retrieval-Augmented Generation (RAG).

O sistema gerencia interações multiusuário, classifica intenções e consulta bases de conhecimento locais para fornecer o cardápio, horários de funcionamento e links de venda.

---

## 📁 Estrutura de Pastas

O projeto adota uma arquitetura limpa e modularizada, dividindo as responsabilidades do ecossistema da seguinte forma:

```text
.
├── src/
│   ├── config/          # Configurações e inicializações de APIs externas (Telegram, Gemini)
│   ├── controllers/     # Controladores responsáveis por interceptar eventos e coordenar fluxos
│   ├── data/            # Base de conhecimento local e arquivos de persistência vetorial (JSON)
│   ├── repositories/    # Camada de abstração e manipulação direta de arquivos de dados
│   ├── services/        # Regras de negócio essenciais (Serviço RAG, IA, Estabelecimento)
│   └── utils/           # Funções utilitárias
├── .env.example         # Modelo configurável das variáveis de ambiente necessárias
├── .dockerignore        # Arquivo de exclusão para otimização do build do Docker
├── Dockerfile           # Instruções de compilação da imagem isolada Node.js
└── docker-compose.yml   # Orquestração do container, volumes mapeados e políticas de reinício
```

## Tecnologias Utilizadas
- **Linguagem:** Node.js (v20)
- **Integração:** API do Telegram (Telegraf) e Google Gemini Flash Lite
- **Infraestrutura:** Docker & Docker Compose
- **Nuvem:** Amazon Web Services (AWS EC2 - Amazon Linux)

## Pré-requisitos e Instalação
Para rodar este projeto, você precisará do [Docker](https://docs.docker.com/get-docker/) instalado na sua máquina ou servidor.

1. **Clone o repositório:**

   ```bash
   git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git)
   cd nome-da-pasta
   ```

2. **Configuração de Variáveis de Ambiente:**
Em vez de expor credenciais diretamente no código, o sistema consome um arquivo .env seguro. Use o arquivo de exemplo fornecido como base:

    ```bash
    cp .env.example .env
    ```

Abra o arquivo .env gerado e preencha com as suas chaves correspondentes.

3. **Execução via Docker:**
O projeto está configurado para subir de forma isolada com reinício automático.

    ```bash
    docker compose up -d --build
    ```

4. **Atualização de Dados (Manutenção):**
Os arquivos de cardápio e estabelecimento encontram-se em `/src/data/`. Ao atualizar o cardápio, reinicie o container para recarregar a memória e os vetores do RAG:

    ```bash
    docker restart bot-confeitaria
    ```
