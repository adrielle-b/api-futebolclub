import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatchesModel from '../Interfaces/MatchesModel';
import MatchesModel from '../models/Matches.Model';
import IMatch from '../Interfaces/Matches';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) { }

  async getAllMatches(inProgress?: string): Promise<ServiceResponse<IMatch[]>> {
    if (inProgress !== undefined) {
      return this.getAllMatchesProgress(inProgress === 'true');
    }

    const matches = await this.matchesModel.getAllMatches();
    return { status: 'SUCCESSFUL', data: matches };
  }

  async getAllMatchesProgress(inProgress: boolean): Promise<ServiceResponse<IMatch[]>> {
    const matchesProgress = await this.matchesModel.getAllMatchesProgress(inProgress);

    return { status: 'SUCCESSFUL', data: matchesProgress };
  }
}
