const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/config/db');
const bcrypt = require('bcryptjs');
require('dotenv').config();

jest.mock('../../src/config/db', () => ({
    execute: jest.fn()
}));

describe('Endpoints de Usuarios', () => {
    it('deve cadastrar um novo usuario com sucesso', async () => {
        // Mock para buscarPorEmail (retorna vazio) e criar (retorna insertId)
        db.execute.mockResolvedValueOnce([[]]); 
        db.execute.mockResolvedValueOnce([{ insertId: 1 }]);

        const res = await request(app)
            .post('/auth/registrar')
            .send({
                nome: "Giliarde",
                email: "teste@email.com",
                senha: "123"
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.nome).toBe("Giliarde");
    });

    it('deve fazer login com sucesso', async () => {
        const senhaHash = await bcrypt.hash('senha123', 10);
        const mockUsuario = [{ id: 1, nome: "Giliarde", email: "teste@email.com", senha: senhaHash }];

        db.execute.mockResolvedValue([mockUsuario]);

        const res = await request(app)
            .post('/auth/login')
            .send({ email: "teste@email.com", senha: 'senha123' });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });
});
