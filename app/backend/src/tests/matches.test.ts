import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

import SequelizeUsers from '../database/models/SequelizeUsers';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { macthesAll, matchesInProgressFalse, matchesInProgressTrue } from './mocks/matches.mock';

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
});