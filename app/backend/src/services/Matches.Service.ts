import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatchesModel from '../Interfaces/MatchesModel';
import MatchesModel from '../models/Matches.Model';
import IMatch from '../Interfaces/Matches';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
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
}
