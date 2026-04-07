const {autenticar} = require('../../src/middlewares/auth.middleware');
const jwt = require('jsonwebtoken');

describe('Auth Middleware', () => {
    it('deve retornar 401 se nenhum token for fornecido', () => {
        const req = {headers: {}};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const next = jest.fn();

        autenticar(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({erro: "Token não fornecido"});
    })
})