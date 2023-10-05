import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderboardService from '../services/Leaderboard.Service';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  async getLeaderboard(req: Request, res: Response) {
    const { path } = req.route;
    const { status, data } = await this.leaderboardService.getLeaderboard(path.substring(1));
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
