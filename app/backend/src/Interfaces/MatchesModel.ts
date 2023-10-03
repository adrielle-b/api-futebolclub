import IMatch from './Matches';

export default interface IMatchesModel{
  getAllMatches(): Promise<IMatch[]>,
  getAllMatchesProgress(inProgress: boolean): Promise<IMatch[]>,
  finishMatch(id: number): Promise<number>,
  updatedMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<number>,
  createMatch(homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<IMatch>
}
