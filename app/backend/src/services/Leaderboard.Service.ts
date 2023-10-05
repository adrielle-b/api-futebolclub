import TeamsModel from '../models/Teams.Model';
import MatchesModel from '../models/Matches.Model';
import ITeam from '../Interfaces/Teams';
import IMatch from '../Interfaces/Matches';
import LeaderboardStatistics from '../utils/leaderboardStatistics';
import { ILeaderboard } from '../Interfaces/Leaderboard';

export default class LeaderboardServices {
  private matchesModel = new MatchesModel();
  private teamsModel = new TeamsModel();

  public async generateStatistics(type: string) {
    const teamsAll = await this.teamsModel.getAllTeams();
    const teams = teamsAll as Array<ITeam>;
    const matchesFinished = await this.matchesModel.getAllMatchesProgress(false);
    const matches = matchesFinished as Array<IMatch>;
    const leaderboard = teams.map((team) => {
      const resultStatistic = new LeaderboardStatistics(
        team.teamName,
        team.id,
        matches.filter((match) => match.homeTeamId === team.id || match.awayTeamId === team.id),
      );
      return resultStatistic.getLeaderboard(type);
    });

    return leaderboard;
  }

  private static sortLeaderboard(leaderboard: Array<ILeaderboard>) {
    return leaderboard
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalVictories - a.totalVictories)
      .sort((a, b) => b.totalPoints - a.totalPoints);
  }

  public async getLeaderboard(type: string) {
    const leaderboard = await this.generateStatistics(type) as ILeaderboard[];
    return { status: 'SUCCESSFUL', data: LeaderboardServices.sortLeaderboard(leaderboard) };
  }
}
