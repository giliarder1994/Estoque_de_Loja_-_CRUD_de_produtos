# 🛒 Estoque de Loja - API REST

API REST de Estoque de Loja desenvolvida com Node.js, Express e MySQL, com autenticação JWT, criptografia de senhas com bcrypt e paginação de resultados.

🌐 **Deploy:** https://estoquedeloja-cruddeprodutos-production.up.railway.app

---

## 🚀 Tecnologias

- **Node.js** — ambiente de execução
- **Express** — framework web
- **MySQL** — banco de dados relacional
- **mysql2** — driver de conexão com o banco
- **bcrypt** — criptografia de senhas
- **jsonwebtoken** — autenticação via JWT
- **dotenv** — variáveis de ambiente

---

## 📁 Estrutura do Projeto

```
src/
 ├── app.js
 ├── db.js
 ├── controllers/
 │    ├── produtos.controller.js
 │    └── usuarios.controller.js
 ├── routes/
 │    ├── produtos.routes.js
 │    └── usuarios.routes.js
 └── middlewares/
      ├── auth.middleware.js
      └── erro.middleware.js
```

---

## ⚙️ Como rodar localmente

**1. Clone o repositório**
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

**2. Instale as dependências**
```bash
npm install
```

**3. Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=loja
DB_PORT=3306
JWT_SECRET=sua_chave_secreta
```

**4. Crie o banco de dados**
```sql
CREATE DATABASE loja;
USE loja;

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    preco DECIMAL(10,2),
    quantidade INT,
    categoria VARCHAR(50)
);

CREATE TABLE usuarios (
    id INT AUTO_AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(255)
);
```

**5. Inicie o servidor**
```bash
node src/app.js
```

Servidor rodando em `http://localhost:3000`

> Em produção: https://estoquedeloja-cruddeprodutos-production.up.railway.app

---

## 🔐 Autenticação

As rotas de produtos são protegidas. Para acessá-las, é necessário enviar o token JWT no header:

```
Authorization: Bearer SEU_TOKEN
```

O token é obtido ao fazer login na rota `/login`.

---

## 📋 Rotas

### Usuários (públicas)

| Método | Rota         | Descrição                    |
|--------|--------------|------------------------------|
| POST   | `/cadastrar` | Cadastrar novo usuário       |
| POST   | `/login`     | Realizar login e obter token |

#### POST /cadastrar
```json
{
    "nome": "Giliarde",
    "email": "giliarde@email.com",
    "senha": "123456"
}
```

**Resposta 201:**
```json
{
    "id": 1,
    "nome": "Giliarde",
    "email": "giliarde@email.com"
}
```

#### POST /login
```json
{
    "email": "giliarde@email.com",
    "senha": "123456"
}
```

**Resposta 200:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

---

### Produtos (protegidas — requer token)

| Método | Rota               | Descrição                |
|--------|--------------------|--------------------------|
| GET    | `/produtos`        | Listar todos os produtos |
| GET    | `/produtos/:id`    | Buscar produto por ID    |
| POST   | `/produtos`        | Criar novo produto       |
| PUT    | `/produtos/:id`    | Atualizar produto        |
| DELETE | `/produtos/:id`    | Deletar produto          |

#### GET /produtos
Suporta filtros e paginação via query string:

```
GET /produtos?categoria=Eletronicos
GET /produtos?pagina=1&limite=10
GET /produtos?categoria=Eletronicos&pagina=1&limite=5
```

**Resposta 200:**
```json
[
    {
        "id": 1,
        "nome": "Notebook",
        "preco": "3500.00",
        "quantidade": 1,
        "categoria": "Eletronicos"
    }
]
```

#### POST /produtos
```json
{
    "nome": "Notebook",
    "preco": 3500,
    "quantidade": 1,
    "categoria": "Eletronicos"
}
```

**Resposta 201:**
```json
{
    "id": 1,
    "nome": "Notebook",
    "preco": 3500,
    "quantidade": 1,
    "categoria": "Eletronicos"
}
```

#### PUT /produtos/:id
```json
{
    "nome": "Notebook Gamer",
    "preco": 5000,
    "quantidade": 2,
    "categoria": "Eletronicos"
}
```

**Resposta 200:**
```json
{
    "id": 1,
    "nome": "Notebook Gamer",
    "preco": 5000,
    "quantidade": 2,
    "categoria": "Eletronicos"
}
```

---

## 📊 Status HTTP utilizados

| Código | Descrição                                |
|--------|------------------------------------------|
| 200    | OK — requisição bem sucedida             |
| 201    | Created — recurso criado                 |
| 204    | No Content — deletado com sucesso        |
| 400    | Bad Request — dados inválidos            |
| 401    | Unauthorized — não autenticado           |
| 404    | Not Found — recurso não encontrado       |
| 409    | Conflict — email já cadastrado           |
| 500    | Internal Server Error — erro no servidor |

---

## 👨‍💻 Autor

Desenvolvido por **Giliarde Rodrigues**