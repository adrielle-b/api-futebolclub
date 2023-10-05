import { ILeaderboard } from './Leaderboard';

export interface ILeaderboardModel {
  getAll(): Promise<ILeaderboard[]>
}
