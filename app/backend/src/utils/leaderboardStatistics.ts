import IMatch from '../Interfaces/Matches';
import { ILeaderboard } from '../Interfaces/Leaderboard';

export default class LeaderboardStatistics {
  private matchesModel: Array<IMatch> = [];

  constructor(
    private name: string,
    private teamId: number,
    private matches: Array<IMatch>,
  ) {}

  private totalVictories(): number {
    return this.matchesModel.reduce((total, match) => {
      if (match.homeTeamId === this.teamId && match.homeTeamGoals > match.awayTeamGoals) {
        return total + 1;
      }
      if (match.awayTeamId === this.teamId && match.awayTeamGoals > match.homeTeamGoals) {
        return total + 1;
      }

      return total;
    }, 0);
  }

  private totalDraws(): number {
    return this.matchesModel.reduce((total, match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) {
        return total + 1;
      }
      return total;
    }, 0);
  }

  private totalPoints(): number {
    return this.totalVictories() * 3 + this.totalDraws();
  }

  private totalGames(): number {
    return this.matchesModel.length;
  }

  private totalLosses(): number {
    return this.matchesModel.reduce((total, match) => {
      if (match.homeTeamId === this.teamId && match.homeTeamGoals < match.awayTeamGoals) {
        return total + 1;
      }
      if (match.awayTeamId === this.teamId && match.awayTeamGoals < match.homeTeamGoals) {
        return total + 1;
      }
      return total;
    }, 0);
  }

  private goalsFavor(): number {
    return this.matchesModel.reduce((total, match) => {
      if (match.homeTeamId === this.teamId) {
        return total + match.homeTeamGoals;
      } return total + match.awayTeamGoals;
    }, 0);
  }

  private goalsOwn(): number {
    return this.matchesModel.reduce((total, match) => {
      if (match.homeTeamId === this.teamId) {
        return total + match.awayTeamGoals;
      } return total + match.homeTeamGoals;
    }, 0);
  }

  private goalsBalance(): number {
    return this.goalsFavor() - this.goalsOwn();
  }

  private efficiency(): string {
    return ((this.totalPoints() / (this.totalGames() * 3)) * 100).toFixed(2);
  }

  private getAllLeaderboard(): ILeaderboard {
    this.matchesModel = [...this.matches];
    return {
      name: this.name,
      totalPoints: this.totalPoints(),
      totalGames: this.totalGames(),
      totalVictories: this.totalVictories(),
      totalDraws: this.totalDraws(),
      totalLosses: this.totalLosses(),
      goalsFavor: this.goalsFavor(),
      goalsOwn: this.goalsOwn(),
      goalsBalance: this.goalsBalance(),
      efficiency: Number(this.efficiency()),
    };
  }

  private getLeaderboardHome(): ILeaderboard {
    this.matchesModel = this.matches.filter((match) => match.homeTeamId === this.teamId);
    return {
      name: this.name,
      totalPoints: this.totalPoints(),
      totalGames: this.totalGames(),
      totalVictories: this.totalVictories(),
      totalDraws: this.totalDraws(),
      totalLosses: this.totalLosses(),
      goalsFavor: this.goalsFavor(),
      goalsOwn: this.goalsOwn(),
      goalsBalance: this.goalsBalance(),
      efficiency: Number(this.efficiency()),
    };
  }

  private getLeaderboardAway(): ILeaderboard {
    this.matchesModel = this.matches.filter((match) => match.awayTeamId === this.teamId);
    return {
      name: this.name,
      totalPoints: this.totalPoints(),
      totalGames: this.totalGames(),
      totalVictories: this.totalVictories(),
      totalDraws: this.totalDraws(),
      totalLosses: this.totalLosses(),
      goalsFavor: this.goalsFavor(),
      goalsOwn: this.goalsOwn(),
      goalsBalance: this.goalsBalance(),
      efficiency: Number(this.efficiency()),
    };
  }

  public getLeaderboard(type: string): ILeaderboard {
    switch (type) {
      case 'home':
        return this.getLeaderboardHome();
      case 'away':
        return this.getLeaderboardAway();
      default:
        return this.getAllLeaderboard();
    }
  }
}
