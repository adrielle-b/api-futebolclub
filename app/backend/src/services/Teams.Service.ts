import ITeam from '../Interfaces/Teams';
import ITeamsModel from '../Interfaces/TeamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamsModel from '../models/Teams.Model';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) { }

  async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.teamsModel.getAllTeams();
    return { status: 'SUCCESSFUL', data: teams };
  }

  async getTeamById(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamsModel.getTeamById(id);
    if (team === null) {
      return { status: 'NOT_FOUND', data: { message: 'Time não encontrado' } };
    }

    return { status: 'SUCCESSFUL', data: team };
  }
}
