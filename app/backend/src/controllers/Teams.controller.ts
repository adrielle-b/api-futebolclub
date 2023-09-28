import { Request, Response } from 'express';
import TeamsService from '../services/Teams.Service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) { }

  async getAllTeams(req: Request, res: Response) {
    const { status, data } = await this.teamsService.getAllTeams();
    res.status(mapStatusHTTP(status)).json(data);
  }

  async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.teamsService.getTeamById(Number(id));
    res.status(mapStatusHTTP(status)).json(data);
  }
}
