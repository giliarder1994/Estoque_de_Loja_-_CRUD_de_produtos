const conexao = require("../db");

exports.buscarProdutos = (req, res) => {
  const id = Number(req.params.id);

  conexao.query(
    "SELECT * FROM produtos WHERE id = ?",
    [id],
    (erro, resultado) => {
      if (erro)
        return res.status(500).json({ erro: "Erro ao buscar produto!" });

      if (!resultado[0]) {
        return res.status(401).json({ erro: "Produto não encontrado" });
      }
      return res.status(200).json(resultado[0]);
    }
  );
};

exports.filtrarProdutos = (req, res) => {
  const { categoria } = req.query;

  let sql = "SELECT * FROM produtos";

  if (categoria) {
    sql = "SELECT * FROM produtos WHERE categoria = ?";
    return conexao.query(sql, [categoria], (erro, resultado) => {
      if (erro)
        return res.status(500).json({ erro: "Erro ao buscar produtos" });
      return res.status(200).json(resultado);
    });
  }

  conexao.query(sql, (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: "Erro ao buscar produtos" });
    return res.status(200).json(resultado);
  });
};

exports.adicionarProdutos = (req, res) => {
  const { nome, preco, quantidade, categoria } = req.body;

  if (!nome || !preco || !quantidade) {
    return res
      .status(400)
      .json({ erro: "O nome, preço e quantidade são obrigatorios!" });
  }

  conexao.query(
    "INSERT INTO produtos (nome, preco, quantidade, categoria) VALUES (?, ?, ?, ?)",
    [nome, preco, quantidade, categoria],
    (erro, resultado) => {
      if (erro)
        return res.status(500).json({ erro: "Erro ao inserir produto." });

      return res
        .status(201)
        .json({ id: resultado.insertId, nome, preco, quantidade, categoria });
    }
  );
};

exports.editarProdutos = (req, res) => {
  const id = Number(req.params.id);
  const { nome, preco, quantidade, categoria } = req.body;

  conexao.query(
    "UPDATE produtos SET nome = ?, preco = ?, quantidade = ?, categoria = ?, WHERE id = ?",
    [nome, preco, quantidade, categoria, id],
    (erro, resultado) => {
      if (erro) return res.status(500).json({ erro: "Produto não encontrado" });
      if (resultado.affectedRows === 0)
        return res.status(404).json({ erro: "Produto não encontrado" });
      return res.status(200).json({ id, nome, preco, quantidade, categoria });
    }
  );
};

exports.deletarProdutos = (req, res) => {
  const id = Number(req.params.id);

  conexao.query(
    "DELETE FROM produtos WHERE id = ?",
    [id],
    (erro, resultado) => {
      if (erro)
        return res.status(500).json({ erro: "Erro ao deletar produto" });
      if (resultado.affectedRows === 0)
        return res.status(404).json({ erro: "Produto não encontrado" });
      return res.status(204).send();
    }
  );
};
