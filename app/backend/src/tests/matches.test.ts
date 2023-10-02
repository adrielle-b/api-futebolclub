import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

import SequelizeUsers from '../database/models/SequelizeUsers';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { macthesAll, matchUpdateGoals, matchesInProgressFalse, matchesInProgressTrue } from './mocks/matches.mock';
import JWT from '../utils/jwt';
import { jwtPayload } from './mocks/login.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', function() {
    afterEach(sinon.restore);

    it('O endpoint GET /matches retorna 200 e todas as partidas', async function () {
        sinon.stub(SequelizeMatches, 'findAll').resolves(SequelizeMatches.bulkBuild(macthesAll));

        const { status, body } = await chai.request(app).get('/matches');

        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal(macthesAll);
    });

    it('O endpoint GET /matches?inProgress=true retorna as partidas em andamento', async function() {
        sinon.stub(SequelizeMatches, 'findAll').resolves(SequelizeMatches.bulkBuild(matchesInProgressTrue));
    
        const { status, body } = await chai.request(app).get('/matches?inProgress=true');
    
        expect(status).to.equal(200);
        expect(body).to.deep.equal(matchesInProgressTrue);
      });
    
    it('O endpoint GET /matches?inProgress=false retorna as partidas finalizadas', async function() {
        sinon.stub(SequelizeMatches, 'findAll').resolves(SequelizeMatches.bulkBuild(matchesInProgressFalse));
    
        const { status, body } = await chai.request(app).get('/matches?inProgress=false');
    
        expect(status).to.equal(200);
        expect(body).to.deep.equal(matchesInProgressFalse);
      });
    
    it('O endpoint PATCH /matches/:id/finish retorna 200 e uma mensagem de sucesso', async function() {
      sinon.stub(JWT, 'verify').resolves(jwtPayload);
      sinon.stub(SequelizeMatches, 'update').resolves([1]);

      const { status, body } = await chai.request(app).patch('/matches/1/finish').set('Authorization', 'tokenValido');

      expect(status).to.equal(200);
      expect(body).to.deep.equal({ message: 'Finished' });
    });

    it('O endpoint PATCH /matches/:id/finish retorna 404 e uma mensagem de erro se não atualizar', async function() {
      sinon.stub(JWT, 'verify').resolves(jwtPayload);
      sinon.stub(SequelizeMatches, 'update').resolves([0]);

      const { status, body } = await chai.request(app).patch('/matches/40/finish').set('Authorization', 'tokenValido');

      expect(status).to.equal(404);
      expect(body).to.deep.equal({ message: 'Partida não encontrada' });
    });

    it('O endpoint PATCH /matches/:id retorna 200 e uma mensagem de sucesso', async function() {
      sinon.stub(JWT, 'verify').resolves(jwtPayload);
      sinon.stub(SequelizeMatches, 'update').resolves([1]);
  
      const { status, body } = await chai.request(app).patch('/matches/1').set('Authorization', 'tokenValido').send(matchUpdateGoals);
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal({ message: 'Updated Goals' });
    });

    it('O endpoint PATCH /matches/:id retorna 404 e uma mensagem de erro se não atualizar', async function() {
      sinon.stub(JWT, 'verify').resolves(jwtPayload);
      sinon.stub(SequelizeMatches, 'update').resolves([0]);

      const { status, body } = await chai.request(app).patch('/matches/40').set('Authorization', 'tokenValido');

      expect(status).to.equal(404);
      expect(body).to.deep.equal({ message: 'Partida não encontrada' });
    });
});