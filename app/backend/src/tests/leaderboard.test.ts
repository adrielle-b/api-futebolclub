import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeMatches from '../database/models/SequelizeMatches';
import {teams} from './mocks/teams.mock';
import { leaderboardAway, leaderboardHome, matchesFinished } from './mocks/leaderboard.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('#Leaderboard', () => {
  afterEach(sinon.restore);

  it('O endpoint GET /leaderboard/home retorna as estatísticas de cada time da casa', async function() {
    sinon.stub(SequelizeTeams, 'findAll').resolves(SequelizeTeams.bulkBuild(teams));
    sinon.stub(SequelizeMatches, 'findAll').resolves(SequelizeMatches.bulkBuild(matchesFinished));

    const { status, body } = await chai.request(app).get('/leaderboard/home');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(leaderboardHome);
  });

  it('O endpoint GET /leaderboard/away retorna as estatísticas de cada time visitante', async function() {
    sinon.stub(SequelizeTeams, 'findAll').resolves(SequelizeTeams.bulkBuild(teams));
    sinon.stub(SequelizeMatches, 'findAll').resolves(SequelizeMatches.bulkBuild(matchesFinished));

    const { status, body } = await chai.request(app).get('/leaderboard/away');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(leaderboardAway);
  });
});