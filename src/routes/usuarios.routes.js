const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarios.controller");

router.post("/cadastrar", usuariosController.cadastrar);
router.post("/login", usuariosController.login);

module.exports = router;