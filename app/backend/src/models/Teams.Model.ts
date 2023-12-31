import SequelizeTeams from '../database/models/SequelizeTeams';
import ITeam from '../Interfaces/Teams';
import ITeamsModel from '../Interfaces/TeamsModel';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async getAllTeams(): Promise<ITeam[]> {
    const data = await this.model.findAll();
    return data.map((team) => team.toJSON());
  }

  async getTeamById(id: number): Promise<ITeam | null> {
    const data = await this.model.findByPk(id);
    return data?.toJSON() || null;
  }
}
