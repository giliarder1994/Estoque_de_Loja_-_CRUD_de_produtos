const express = require('express');
const app = express();
const porta = 3000;
const produtosRouter = require("./routes/produtos.routes");
const usuariosRouter = require("./routes/usuarios.routes");


app.use(express.json())

app.use(produtosRouter)

app.use(usuariosRouter);



app.listen(porta, () => {console.log("Servidor rodando")})