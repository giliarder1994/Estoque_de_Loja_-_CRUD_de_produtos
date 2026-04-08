const request = require('supertest');
const app = require('../../src/app');
const conexao = require('../../src/db');
const bcrypt = require('bcrypt');
require('dotenv').config();

jest.mock('../../src/db', () => ({
    promise: jest.fn().mockReturnThis(),
    query: jest.fn()
}));

describe('Endpoints de Usuarios', () => {
    it('deve cadastrar um novo usuario com sucesso ', async () => {
        conexao.promise().query.mockResolvedValue([{insertId: 1}]);

        const res = await request(app)
            .post('/cadastrar')
            .send({
                nome: "Giliarde",
                email: "teste@email.com",
                senha: "123"
        })

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.nome).toBe("Giliarde");
    });

    it('deve falhar se faltar campos obrigatorios', async () => {
        const res = await request(app)
            .post('/cadastrar')
            .send({nome: "Incompleto"});
        
        expect(res.statusCode).toEqual(400);
    })

    it('deve fazer login com sucesso', async () => {
        const senhaHash = await bcrypt.hash('senha123', 10);
        const mockUsuario = [{id: 1, nome: "Giliarde", email: "teste@email.com", senha: senhaHash}]

        conexao.promise().query.mockResolvedValue([mockUsuario]);

        const res = await request(app)
            .post('/login')
            .send({ email: "teste@email.com", senha: 'senha123'});

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    })

    it('deve falhar no login com senha incorreta', async () => {
        const senhaHash = await bcrypt.hash('senha123', 10);
        conexao.promise().query.mockResolvedValue([{id: 1, senha: senhaHash}]);

        const res = await request(app)
            .post('/login')
            .send({email: 'teste@email.com', senha: 'senha_errada'});

        expect(res.statusCode).toBe(401);
        expect(res.body.erro).toBe("Email ou senha inválidos");
    })
})