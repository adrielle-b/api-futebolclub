import { Request, Response, Router } from 'express';
import TeamsController from '../controllers/Teams.controller';

const teamsController = new TeamsController();

const teamsRouter = Router();

teamsRouter.get('/', (req: Request, res: Response) => teamsController.getAllTeams(req, res));
teamsRouter.get('/:id', (req: Request, res: Response) => teamsController.getTeamById(req, res));

export default teamsRouter;
