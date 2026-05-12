const router = require('express').Router();
const controller = require('../controllers/produtos.controller');
const { autenticar } = require('../middlewares/auth.middleware');

router.use(autenticar); 

router.get('/', controller.listarProdutos);
router.get('/:id', controller.buscarUm);
router.post('/', controller.criar);
router.put('/:id', controller.editar);
router.delete('/:id', controller.deletar);

module.exports = router;
