const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Mock do banco de dados para usar .execute()
jest.mock('../../src/config/db', () => ({
    execute: jest.fn()
}));

describe('Endpoints de Produtos', () => {
    let token;

    beforeAll(() => {
        token = jwt.sign({id: 1, nome: 'Admin'}, process.env.JWT_SECRET || 'secret');
    });

    it('deve listar produtos sem filtros', async () => {
        const mockProdutos = [{id: 1, nome: 'Teclado', preco: 100}];
        db.execute.mockResolvedValue([mockProdutos]);

        const res = await request(app)
            .get('/produtos')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(mockProdutos);
    });

    it('deve adicionar um produto com sucesso', async () => {
        db.execute.mockResolvedValue([{ insertId: 99 }]);

        const novoProduto = {
            nome: "Mouse Gamer",
            preco: 150.00,
            quantidade: 10,
            categoria: "Periféricos"
        };

        const res = await request(app)
            .post('/produtos')
            .set('Authorization', `Bearer ${token}`)
            .send(novoProduto);

        expect(res.statusCode).toBe(201);
        expect(res.body.id).toBe(99);
    });
});
