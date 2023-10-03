import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/Matches.controller';
import Authentication from '../middlewares/Authentication';

const matchesController = new MatchesController();

const matchesRouter = Router();

matchesRouter.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

matchesRouter.patch(
  '/:id/finish',
  Authentication.validateToken,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);

matchesRouter.patch(
  '/:id',
  Authentication.validateToken,
  (req: Request, res: Response) => matchesController.updatedMatch(req, res),
);

matchesRouter.post(
  '/',
  Authentication.validateToken,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default matchesRouter;
