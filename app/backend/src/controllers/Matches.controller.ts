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
}
