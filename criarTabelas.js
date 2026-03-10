require("dotenv").config();
const conexao = require("./src/db");

const sql = `
    CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        senha VARCHAR(255)
    )
`;

conexao.query(sql, (erro) => {
    if (erro) {
        console.log("Erro:", erro);
        return;
    }
    console.log("Tabela usuarios criada!");
    process.exit();
});