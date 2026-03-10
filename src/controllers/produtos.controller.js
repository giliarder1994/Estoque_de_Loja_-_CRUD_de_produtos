const conexao = require("../db");

exports.buscarProdutos = async (req, res) => {
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
      return res.status(500).json({ erro: "Erro ao buscar produto!" });
  }
}

exports.filtrarProdutos = async (req, res) => {
  try {
      const { categoria } = req.query;

      if (categoria) {
          const [resultado] = await conexao.promise().query(
              "SELECT * FROM produtos WHERE categoria = ?", 
              [categoria]
          );
          return res.status(200).json(resultado);
      }

      const [resultado] = await conexao.promise().query("SELECT * FROM produtos");
      return res.status(200).json(resultado);

  } catch (erro) {
      return res.status(500).json({ erro: "Erro ao buscar produtos" });
  }
}

exports.adicionarProdutos = async (req, res) => {
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

  } catch (error) {
    return res.status(500).json({ erro: "Erro ao inserir produto." });

  }
};

exports.editarProdutos = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nome, preco, quantidade, categoria } = req.body;

    const [resultado] = await conexao.promise().query(
      "UPDATE produtos SET nome = ?, preco = ?, quantidade = ?, categoria = ? WHERE id = ?",
      [nome, preco, quantidade, categoria, id]);

      if (resultado.affectedRows === 0)
        return res.status(404).json({ erro: "Produto não encontrado" });
      return res.status(200).json({ id, nome, preco, quantidade, categoria });
    
  } catch (error) {
    return res.status(500).json({ erro: "Produto não encontrado" });
  }
};

exports.deletarProdutos = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const [resultado] = await conexao.promise().query(
      "DELETE FROM produtos WHERE id = ?",
      [id]);
      if (resultado.affectedRows === 0)
        return res.status(404).json({ erro: "Produto não encontrado" });
      return res.status(204).send();

  } catch (error) {
    return res.status(500).json({ erro: "Erro ao deletar produto" });
  }
};
