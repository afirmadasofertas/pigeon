# PigeonLP - 21st Agent

Projeto Next.js com 21st SDK para AI Agents.

## Setup

### Pré-requisitos

- Node.js 18+
- npm ou pnpm

### Instalação

1. Clonar ou navegar para o diretório do projeto
2. Instalar dependências:
   ```bash
   npm install
   ```

### Configuração

1. Obtenha sua chave de API em [21st Dashboard](https://21st.dev/agents/app)
2. Atualize `.env.local` com sua chave:
   ```
   API_KEY_21ST=sua_chave_aqui
   ```

### Desenvolvimento

```bash
npm run dev
```

Abra http://localhost:3000 para ver o agente em ação.

### Deploy

1. Faça login com seu API key:
   ```bash
   npx @21st-sdk/cli login
   ```

2. Deploy:
   ```bash
   npx @21st-sdk/cli deploy
   ```

## Referências

- [21st SDK Documentação](https://21st.dev/agents/docs)
- [Get Started Guide](https://21st.dev/agents/docs/md/get-started)
