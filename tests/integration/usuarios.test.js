const request = require('supertest');
const app = require('../../src/app');
const conexao = require('../../src/db');

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
})