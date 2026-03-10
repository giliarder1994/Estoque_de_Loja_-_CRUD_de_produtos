const express = require("express");
const router = express.Router();
const produtosControler = require("../controllers/produtos.controller");

router.get("/produtos/:id", produtosControler.buscarProdutos);
router.get("/produtos", produtosControler.filtrarProdutos);
router.post("/produtos", produtosControler.adicionarProdutos);
router.put("/produtos/:id", produtosControler.editarProdutos);
router.delete("/produtos/:id", produtosControler.deletarProdutos);

module.exports = router;