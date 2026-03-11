const express = require('express');
const app = express();
const porta = 3000;
const produtosRouter = require("./routes/produtos.routes");
const usuariosRouter = require("./routes/usuarios.routes");
const { erroMiddleware } = require("./middlewares/erro.middleware");


app.use(express.json())

app.use(produtosRouter)

app.use(usuariosRouter);

app.use(erroMiddleware);



app.listen(porta, () => {console.log("Servidor rodando")})