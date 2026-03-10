const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "mainline.proxy.rlwy.net",
    user: "root",
    password: "ZHGVEnkeLbuIYBJiRihZciaDOmSxAGaF",
    database: "railway",
    port: 17324
});

conexao.connect((erro) => {
    if (erro) {
        console.log("Erro ao conectar:", erro);
        return;
    }
    console.log("Conectado ao MySQL com sucesso!");
});

module.exports = conexao;