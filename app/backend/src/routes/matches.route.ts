import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/Matches.controller';

const matchesController = new MatchesController();

const matchesRouter = Router();

matchesRouter.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

export default matchesRouter;
