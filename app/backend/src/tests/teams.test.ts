import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

import SequelizeTeams from '../database/models/SequelizeTeams';
import { teams } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', function() {
    afterEach(sinon.restore);

  it('O endpoint GET /teams deve retornar todos os times', async function () {
    sinon.stub(SequelizeTeams, 'findAll').resolves(teams.map((team) => SequelizeTeams.build(team)));

    const { status, body} = await chai.request(app).get('/teams');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('O endpoint GET /teams/:id deve retornar o time com o id informado', async function () {
    const id = 1;
    sinon.stub(SequelizeTeams, 'findByPk').resolves(SequelizeTeams.build(teams[0]));

    const { status, body} = await chai.request(app).get(`/teams/${id}`);
    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams[0]);
  });

  it('O endpoint GET /teams/:id deve retornar 404 se o time não existir', async function () {
    const id = 1;
    sinon.stub(SequelizeTeams, 'findByPk').resolves(null);

    const { status, body} = await chai.request(app).get(`/teams/${id}`);
    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'Time não encontrado' });
  });
});
