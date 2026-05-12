const express = require('express');
const app = express();
const produtosRouter = require("./routes/produtos.routes");
const usuariosRouter = require("./routes/usuarios.routes");
const { erroMiddleware } = require("./middlewares/erro.middleware");

app.use(express.json());


app.use('/produtos', produtosRouter);
app.use('/auth', usuariosRouter);

app.use(erroMiddleware);

module.exports = app;
