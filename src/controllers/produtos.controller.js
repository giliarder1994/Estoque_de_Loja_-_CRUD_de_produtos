const conexao = require("../db");

exports.buscarProdutos = async (req, res, next) => {
  try {
      const id = Number(req.params.id);

      const [resultado] = await conexao.promise().query(
          "SELECT * FROM produtos WHERE id = ?", [id]
      );

      if (!resultado[0]) {
          return res.status(404).json({ erro: "Produto não encontrado" });
      }

      return res.status(200).json(resultado[0]);

  } catch (erro) {
    return next(erro);
  }
}

exports.filtrarProdutos = async (req, res, next) => {
  try {
      const { categoria, pagina = 1, limite = 10 } = req.query;

      const offset = (pagina - 1) * limite;

      if (categoria) {
          const [resultado] = await conexao.promise().query(
              "SELECT * FROM produtos WHERE categoria = ? LIMIT ? OFFSET ?",
              [categoria, Number(limite), Number(offset)]
          );
          return res.status(200).json(resultado);
      }

      const [resultado] = await conexao.promise().query(
          "SELECT * FROM produtos LIMIT ? OFFSET ?",
          [Number(limite), Number(offset)]
      );
      return res.status(200).json(resultado);

  } catch (erro) {
    return next(erro);
  }
}

exports.adicionarProdutos = async (req, res, next) => {
  try {
    const { nome, preco, quantidade, categoria } = req.body;

    if (!nome || !preco || !quantidade) {
      return res
        .status(400)
        .json({ erro: "O nome, preço e quantidade são obrigatorios!" });
    }

    const [resultado] = await conexao.promise().query(
      "INSERT INTO produtos (nome, preco, quantidade, categoria) VALUES (?, ?, ?, ?)",
      [nome, preco, quantidade, categoria]);
      return res.status(201).json({ id: resultado.insertId, nome, preco, quantidade, categoria });

  } catch (erro) {
    return next(erro);

  }
};

exports.editarProdutos = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { nome, preco, quantidade, categoria } = req.body;

    const [resultado] = await conexao.promise().query(
      "UPDATE produtos SET nome = ?, preco = ?, quantidade = ?, categoria = ? WHERE id = ?",
      [nome, preco, quantidade, categoria, id]);

      if (resultado.affectedRows === 0)
        return res.status(404).json({ erro: "Produto não encontrado" });
      return res.status(200).json({ id, nome, preco, quantidade, categoria });
    
  } catch (erro) {
    return next(erro);
  }
};

exports.deletarProdutos = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const [resultado] = await conexao.promise().query(
      "DELETE FROM produtos WHERE id = ?",
      [id]);
      if (resultado.affectedRows === 0)
        return res.status(404).json({ erro: "Produto não encontrado" });
      return res.status(204).send();

  } catch (erro) {
    return next(erro);
  }
};
