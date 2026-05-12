const produtoService = require('../services/produtoService');

exports.listarProdutos = async (req, res, next) => {
    try {
        const { categoria, pagina = 1, limite = 10 } = req.query;
        const offset = (pagina - 1) * limite;
        const produtos = await produtoService.buscarTodos(categoria, limite, offset);
        res.json(produtos);
    } catch (error) { next(error); }
};

exports.buscarUm = async (req, res, next) => {
    try {
        const produto = await produtoService.buscarPorId(req.params.id);
        if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
        res.json(produto);
    } catch (error) { next(error); }
};

exports.criar = async (req, res, next) => {
    try {
        const { nome, preco, quantidade } = req.body;
        if (!nome || !preco || !quantidade) {
            return res.status(400).json({ erro: "Campos obrigatórios faltando" });
        }
        const novo = await produtoService.salvar(req.body);
        res.status(201).json(novo);
    } catch (error) { next(error); }
};

exports.editar = async (req, res, next) => {
    try {
        const sucesso = await produtoService.atualizar(req.params.id, req.body);
        if (!sucesso) return res.status(404).json({ erro: "Produto não encontrado" });
        res.json({ id: req.params.id, ...req.body });
    } catch (error) { next(error); }
};

exports.deletar = async (req, res, next) => {
    try {
        const sucesso = await produtoService.remover(req.params.id);
        if (!sucesso) return res.status(404).json({ erro: "Produto não encontrado" });
        res.status(204).send();
    } catch (error) { next(error); }
};
