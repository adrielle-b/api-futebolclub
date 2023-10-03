import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

import SequelizeMatches from '../database/models/SequelizeMatches';
import { macthesAll, matchCreate, matchCreateInvalido, matchCreated, matchUpdateGoals, matchesInProgressFalse, matchesInProgressTrue } from './mocks/matches.mock';
import JWT from '../utils/jwt';
import { jwtPayload } from './mocks/login.mock';
import SequelizeTeams from '../database/models/SequelizeTeams';

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

    it('O endpoint POST /matches retorna 201 e a partida criada', async function() {
      sinon.stub(JWT, 'verify').resolves(jwtPayload);
      sinon.stub(SequelizeMatches, 'create').resolves(SequelizeMatches.build(matchCreated));

      const { status, body } = await chai.request(app).post('/matches').set('Authorization', 'tokenValido').send(matchCreate);

      expect(status).to.equal(201);
      expect(body).to.deep.equal(matchCreated);
    });

    it('O endpoint POST /matches retorna 422 e uma mensagem de erro se os times forem iguais', async function() {
      sinon.stub(JWT, 'verify').resolves(jwtPayload);

      const { status, body } = await chai.request(app).post('/matches').set('Authorization', 'tokenValido').send(matchCreateInvalido);

      expect(status).to.equal(422);
      expect(body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
    });

    it('O endpoint POST /matches retorna 404 e uma mensagem de erro se não encontrar os times', async function() {
      sinon.stub(JWT, 'verify').resolves(jwtPayload);
      sinon.stub(SequelizeTeams, 'findByPk').resolves(null);

      const { status, body } = await chai.request(app).post('/matches').set('Authorization', 'tokenValido').send(matchCreate);

      expect(status).to.equal(404);
      expect(body).to.deep.equal({ message: 'There is no team with such id!' });
    })
});