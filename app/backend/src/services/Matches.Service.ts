import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatchesModel from '../Interfaces/MatchesModel';
import MatchesModel from '../models/Matches.Model';
import IMatch from '../Interfaces/Matches';
import ITeamsModel from '../Interfaces/TeamsModel';
import TeamsModel from '../models/Teams.Model';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) { }

  async getAllMatches(inProgress?: string): Promise<ServiceResponse<IMatch[]>> {
    if (inProgress) {
      return this.getAllMatchesProgress(inProgress === 'true');
    }

    const matches = await this.matchesModel.getAllMatches();
    return { status: 'SUCCESSFUL', data: matches };
  }

  async getAllMatchesProgress(inProgress: boolean): Promise<ServiceResponse<IMatch[]>> {
    const matchesProgress = await this.matchesModel.getAllMatchesProgress(inProgress);

    return { status: 'SUCCESSFUL', data: matchesProgress };
  }

  async finishMatch(id: number): Promise<ServiceResponse<{ message: string }>> {
    const finish = await this.matchesModel.finishMatch(id);
    if (!finish) {
      return { status: 'NOT_FOUND', data: { message: 'Partida não encontrada' } };
    }

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  async updatedMatch(id:number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<ServiceResponse<{ message: string }>> {
    const updatedMatchGoals = await this.matchesModel
      .updatedMatch(id, homeTeamGoals, awayTeamGoals);

    if (!updatedMatchGoals) {
      return { status: 'NOT_FOUND', data: { message: 'Partida não encontrada' } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Updated Goals' } };
  }

  async validateTeams(homeTeamId: number, awayTeamId: number)
    : Promise<ServiceResponse<{ message: string }>> {
    if (homeTeamId === awayTeamId) {
      return {
        status: 'UNPROCESSABLE_ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' },
      };
    }
    const verifyTeam1 = await this.teamsModel.getTeamById(homeTeamId);
    const verifyTeam2 = await this.teamsModel.getTeamById(awayTeamId);
    if (!verifyTeam1 || !verifyTeam2) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Teams verified' } };
  }

  async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<IMatch | { message: string }>> {
    const { status, data } = await this.validateTeams(homeTeamId, awayTeamId);
    if (status !== 'SUCCESSFUL') return { status, data };

    const matchCreated = await this.matchesModel
      .createMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
    return { status: 'CREATED', data: matchCreated };
  }
}
