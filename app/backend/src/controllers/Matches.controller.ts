import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../services/Matches.Service';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress === undefined) {
      const { status, data } = await this.matchesService.getAllMatches();
      return res.status(mapStatusHTTP(status)).json(data);
    }

    const { status, data } = await this.matchesService.getAllMatches(String(inProgress));
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;

    const { status, data } = await this.matchesService.finishMatch(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async updatedMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const { status, data } = await this.matchesService
      .updatedMatch(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
