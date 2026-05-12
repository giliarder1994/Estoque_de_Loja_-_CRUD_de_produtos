const produtoService = require('../services/produtoService');

exports.listarProdutos = async (req, res) => {
    try {
        const { categoria, pagina = 1, limite = 10 } = req.query;
        const offset = (pagina - 1) * limite;
        const produtos = await produtoService.buscarTodos(categoria, limite, offset);
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar produtos.' });
    }
};

exports.criarProduto = async (req, res) => {
    try {
        const novoProduto = await produtoService.salvar(req.body);
        res.status(201).json(novoProduto);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar produto.' });
    }
};

exports.deletarProduto = async (req, res) => {
    try {
        const sucesso = await produtoService.remover(req.params.id);
        if (!sucesso) return res.status(404).json({ error: 'Produto não encontrado.' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar produto.' });
    }
};
