import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

import SequelizeUsers from '../database/models/SequelizeUsers';
import { jwtPayload, loginInexistente, loginInvalidoEmail, loginInvalidoSenha } from './mocks/login.mock';
import JWT from '../utils/jwt';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', function() {
    afterEach(sinon.restore);

    it('O endpoint POST /login deve retornar 401 se o usuário não existir', async function () {
        sinon.stub(SequelizeUsers, 'findOne').resolves(null);

        const { status, body } = await chai.request(app).post('/login').send(loginInexistente);

        expect(status).to.equal(401);
        expect(body).to.deep.equal({ message: 'Invalid email or password' });
    });

    it('O endpoint POST /login deve retornar uma mensagem de erro com body inválido', async function() {
        const { status, body } = await chai.request(app).post('/login').send({});
    
        expect(status).to.equal(400);
        expect(body).to.deep.equal({ message: 'All fields must be filled' });
      });

    it('O endpoint POST /login deve retornar 401 se email for inválido', async function () {
        const { status, body } = await chai.request(app).post('/login').send(loginInvalidoEmail);

        expect(status).to.equal(401);
        expect(body).to.deep.equal({ message: 'Invalid email or password' });
    });

    it('O endpoint POST /login deve retornar 401 se senha for inválida', async function () {
        const { status, body } = await chai.request(app).post('/login').send(loginInvalidoSenha);

        expect(status).to.equal(401);
        expect(body).to.deep.equal({ message: 'Invalid email or password' });
    });

    it('O endpoint GET /login/role deve retornar 200 e o role do usuário', async function () {
        sinon.stub(JWT, 'verify').returns(jwtPayload);
        const { status, body } = await chai.request(app).get('/login/role').set('Authorization', 'valido');

        expect(status).to.equal(200);
        expect(body).to.deep.equal({ role: 'admin' });
    });

    it('O endpoint GET /login/role deve retornar 401 se o token não for enviado', async function () {
        const { status, body } = await chai.request(app).get('/login/role').set('Authorization', 'invalido');

        expect(status).to.equal(401);
        expect(body).to.deep.equal({ message: 'Token must be a valid token' });
    });
});
