const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarios.controller");


router.post("/registrar", usuariosController.cadastrar);
router.post("/login", usuariosController.login);

module.exports = router;
