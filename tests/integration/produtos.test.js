const request = require('supertest');
const app = require('../../src/app');
const conexao = require('../../src/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Mock do banco de dados
jest.mock('../../src/db', () => ({
    promise: jest.fn().mockReturnThis(),
    query: jest.fn()
}));

describe('Endpoints de Produtos', () => {
    let token;

    beforeAll(() => {
        //Gera token falso para passar pelo middleware de auth
        token = jwt.sign({id: 1, nome: 'Admin'}, process.env.JWT_SECRET || 'secret');
    });

    it('deve listar produtos (filtrarProdutos) sem filtros', async () => {
        const mockProdutos = [{id: 1, nome: 'Teclado', preco: 100}];
        conexao.promise().query.mockResolvedValue([mockProdutos]);

        const res = await request(app)
            .get('/produtos')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(mockProdutos);
    });

    it('deve adicionar um produto com sucesso', async () => {
        conexao.promise().query.mockResolvedValue([{insertId: 99}]);

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
    })

    it('deve retornar 404 ao tentar editar produto inexistente', async () => {
        conexao.promise().query.mockResolvedValue([{affectedRows: 0 }]);

        const res = await request(app)
            .put('/produtos/999')
            .set('Authorization', `Bearer ${token}`)
            .send({nome: "Teste", preco: 10, quantidade: 1, categoria: "T"});

        expect(res.statusCode).toBe(404);
        expect(res.body.erro).toBe("Produto não encontrado");
    })
})