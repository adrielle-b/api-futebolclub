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

  async finishMatch(id: number): Promise<number> {
    const [updated] = await this.model.update({ inProgress: false }, { where: { id } });
    return updated;
  }

  async updatedMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<number> {
    const [updated] = await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return updated;
  }

  async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<IMatch> {
    const newMatch = await this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return newMatch.toJSON();
  }
}
