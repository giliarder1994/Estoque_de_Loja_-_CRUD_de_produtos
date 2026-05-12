const usuarioService = require('../services/usuarioService');
const bcrypt = require('bcryptjs'); // Recomendo bcryptjs pela facilidade
const jwt = require('jsonwebtoken');

exports.cadastrar = async (req, res, next) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ erro: "Nome, email e senha são obrigatórios" });
        }

        const usuarioExistente = await usuarioService.buscarPorEmail(email);
        if (usuarioExistente) {
            return res.status(409).json({ erro: "Este email já está cadastrado" });
        }

        const hash = await bcrypt.hash(senha, 10);
        const id = await usuarioService.criar(nome, email, hash);

        return res.status(201).json({ id, nome, email });

    } catch (erro) {
        next(erro);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ erro: "Email e senha são obrigatórios" });
        }

        const usuario = await usuarioService.buscarPorEmail(email);
        if (!usuario) {
            return res.status(401).json({ erro: "Email ou senha inválidos" });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.status(401).json({ erro: "Email ou senha inválidos" });
        }

        const token = jwt.sign(
            { id: usuario.id, nome: usuario.nome },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({ token });

    } catch (erro) {
        next(erro);
    }
};
