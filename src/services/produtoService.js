const db = require('../config/db');

exports.buscarTodos = async (categoria, limite, offset) => {
    let sql = 'SELECT * FROM produtos';
    const params = [];

    if (categoria) {
        sql += ' WHERE categoria = ?';
        params.push(categoria);
    }

    sql += ' LIMIT ? OFFSET ?';
    params.push(Number(limite), Number(offset));

    const [rows] = await db.execute(sql, params);
    return rows;
};

exports.buscarPorId = async (id) => {
    const [rows] = await db.execute('SELECT * FROM produtos WHERE id = ?', [id]);
    return rows[0];
};

exports.salvar = async (dados) => {
    const { nome, preco, quantidade, categoria } = dados;
    const [result] = await db.execute(
        'INSERT INTO produtos (nome, preco, quantidade, categoria) VALUES (?, ?, ?, ?)',
        [nome, preco, quantidade, categoria]
    );
    return { id: result.insertId, ...dados };
};

exports.atualizar = async (id, dados) => {
    const { nome, preco, quantidade, categoria } = dados;
    const [result] = await db.execute(
        'UPDATE produtos SET nome = ?, preco = ?, quantidade = ?, categoria = ? WHERE id = ?',
        [nome, preco, quantidade, categoria, id]
    );
    return result.affectedRows > 0;
};

exports.remover = async (id) => {
    const [result] = await db.execute('DELETE FROM produtos WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
