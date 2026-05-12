const db = require('../config/db');

exports.buscarPorEmail = async (email) => {
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
};

exports.criar = async (nome, email, senhaHash) => {
    const [result] = await db.execute(
        'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
        [nome, email, senhaHash]
    );
    return result.insertId;
};
