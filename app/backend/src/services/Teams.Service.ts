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
}
