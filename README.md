# 📦 Estoque de Loja - API REST

API REST para gerenciamento de estoque e controle de produtos. Desenvolvida com **Node.js**, **Express** e **MySQL**, o sistema conta com autenticação JWT, criptografia de senhas e uma arquitetura organizada em camadas para facilitar a manutenção e escalabilidade.

## 🚀 Tecnologias

* **Node.js** — Ambiente de execução JavaScript
* **Express** — Framework para construção da API
* **MySQL** — Banco de dados relacional
* **mysql2** — Driver MySQL com suporte a Promises
* **JWT (JSON Web Token)** — Autenticação segura via Token
* **bcryptjs** — Criptografia de senhas
* **Jest & Supertest** — Testes unitários e de integração
* **dotenv** — Gerenciamento de variáveis de ambiente

## 📁 Estrutura do Projeto

```text
src/
 ├── config/
 │    └── db.js              # Configuração do Pool de conexão MySQL
 │
 ├── controllers/
 │    ├── produtos.controller.js
 │    └── usuarios.controller.js
 │
 ├── middlewares/
 │    ├── auth.middleware.js # Proteção de rotas via JWT
 │    └── erro.middleware.js # Tratamento centralizado de erros
 │
 ├── routes/
 │    ├── produtos.routes.js
 │    └── usuarios.routes.js
 │
 ├── services/
 │    ├── produtoService.js  # Regras de negócio e Queries SQL
 │    └── usuarioService.js  # Gestão de usuários no banco
 │
 ├── app.js                  # Configurações do Express
 └── server.js               # Inicialização do servidor

sql/
 └── setup.sql               # Script de criação das tabelas

tests/
 ├── integration/            # Testes de endpoints
 └── unit/                   # Testes de lógica e middlewares

```

## ⚙️ Funcionalidades

### 🔐 Autenticação

* **Cadastro de usuários:** Registro com senha criptografada.
* **Login:** Autenticação por e-mail/senha com geração de token JWT.
* **Proteção:** Middlewares que garantem que apenas usuários logados gerenciem o estoque.

### 📦 Gerenciamento de Estoque (CRUD)

* **Listar Produtos:** Com suporte a filtros por categoria e paginação.
* **Buscar por ID:** Detalhes de um item específico.
* **Criar Produto:** Adição de novos itens com validação de campos.
* **Editar Produto:** Atualização de preços, quantidades e nomes.
* **Deletar:** Remoção definitiva de itens do estoque.

## 🗄️ Estrutura do Banco de Dados

O sistema opera com duas tabelas principais:

1. **usuarios:** Armazena `nome`, `email` (único) e `senha` (hash).
2. **produtos:** Armazena `nome`, `preco`, `quantidade` e `categoria`.

## ⚙️ Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/estoque-loja-api.git
cd estoque-loja-api

```

### 2. Instale as dependências

```bash
npm install

```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=estoque_loja
JWT_SECRET=sua_chave_secreta_aqui

```

### 4. Configure o banco de dados

Execute o script SQL localizado em `sql/setup.sql` no seu gerenciador MySQL (MySQL Workbench, DBeaver, etc).

### 5. Inicie o servidor

**Ambiente de desenvolvimento (com nodemon):**

```bash
npm run dev

```

**Rodar Testes:**

```bash
npm test

```

## 📋 Principais Rotas

### 🔐 Autenticação

| Método | Rota | Descrição |
| --- | --- | --- |
| POST | `/auth/registrar` | Cadastro de novo usuário |
| POST | `/auth/login` | Login e recebimento do Token |

### 📦 Produtos (Requer Token)

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/produtos` | Lista produtos (Paginação: ?pagina=1&limite=10) |
| GET | `/produtos/:id` | Busca um produto específico |
| POST | `/produtos` | Cadastra um novo produto |
| PUT | `/produtos/:id` | Atualiza dados do produto |
| DELETE | `/produtos/:id` | Remove produto do estoque |

## 👨‍💻 Autor

**Giliarde Rodrigues**

Desenvolvedor focado em Backend e Software Engineering, com experiência em transição de carreira e projetos voltados para eficiência logística e gestão.

---
