# 📱 Contacts Manager API

## 📖 Sobre o Projeto
API RESTful desenvolvida com Node.js, Express, Prisma ORM e SQL Server para gerenciamento de contatos, com validação de números de telefone através da integração com a API NumberVerify.

### OBS:
Este repositório contém o backend do projeto. Para rodar o frontend tambem, siga a documentação disponível nesse outro repositório:

🔗 [Contact Manager Frontend](https://github.com/conradocmatheus/contact-manager-front)

## 🛠️ Tecnologias
- **Node.js** (v22.14.0)
- **Express.js** - Framework web
- **Prisma ORM** - ORM para SQL Server
- **SQL Server** - Banco de dados
- **JWT** - Autenticação
- **bcrypt** - Criptografia de senhas
- **NumVerify API** - Validação de números de telefone

## 🚀 Instalação e Configuração

### Pré-requisitos
- [Node.js](https://nodejs.org/) (v22.14.0 ou superior)
- [SQL Server](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads)
- [Postman](https://www.postman.com/) (opcional, para testes de API)

### Configuração das Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
DATABASE_URL="sqlserver://localhost:1433;database=contacts_manager;user=sa;password=admin;encrypt=true;TrustServerCertificate=true"
JWT_SECRET=chaveSecretaSuperSeguraInvisivelInvencivelGrande
BCRYPT_SALT_ROUNDS=10

# NumberVerify Configuration
NUMVERIFY_API_KEY=your_api_key
NUMVERIFY_API_URL=http://apilayer.net/api/validate
```

> **Nota:** Substitua os valores conforme suas configurações locais. Se precisar obter uma chave de API do NumVerify, entre em contato comigo ou crie uma conta nesse [site](https://numverify.com/).

### Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar migrações do banco de dados
npx prisma migrate dev --name init

# Iniciar servidor de desenvolvimento
npm run dev
```

A API estará disponível em: `http://localhost:3000`

## 📡 Endpoints

A API possui os seguintes grupos de endpoints:

- **Autenticação** - Registro e login de usuários
- **Contatos** - CRUD para gerenciamento de contatos
- **Validação** - Verificação de números de telefone

### Testes com Postman

Para testar:

1. Abra o Postman ou o Insomnia
2. Selecione o arquivo `postman_collection.json` incluído no projeto
3. Todos os endpoints estarão disponíveis para teste
