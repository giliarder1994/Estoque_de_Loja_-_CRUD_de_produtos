const express = require("express");
const router = express.Router();
const produtosController = require("../controllers/produtos.controller");
const { autenticar } = require("../middlewares/auth.middleware");

router.get("/produtos", autenticar, produtosController.filtrarProdutos);
router.get("/produtos/:id", autenticar, produtosController.buscarProdutos);
router.post("/produtos", autenticar, produtosController.adicionarProdutos);
router.put("/produtos/:id", autenticar, produtosController.editarProdutos);
router.delete("/produtos/:id", autenticar, produtosController.deletarProdutos);

module.exports = router;