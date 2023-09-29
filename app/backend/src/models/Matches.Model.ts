import IMatchesModel from '../Interfaces/MatchesModel';
import SequelizeMatches from '../database/models/SequelizeMatches';
import IMatch from '../Interfaces/Matches';
import SequelizeTeams from '../database/models/SequelizeTeams';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

  async getAllMatches(): Promise<IMatch[]> {
    const data = await this.model.findAll({
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return data.map((match) => match.toJSON());
  }

  async getAllMatchesProgress(inProgress: boolean): Promise<IMatch[]> {
    const data = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return data.map((match) => match.toJSON());
  }
}
