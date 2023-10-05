import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const leaderBoardController = new LeaderboardController();

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/home',
  (req: Request, res: Response) => leaderBoardController.getLeaderboard(req, res),
);

leaderboardRouter.get(
  '/away',
  (req: Request, res: Response) => leaderBoardController.getLeaderboard(req, res),
);

leaderboardRouter.get(
  '/',
  (req: Request, res: Response) => leaderBoardController.getLeaderboard(req, res),
);

export default leaderboardRouter;
