import IMatch from './Matches';

export default interface IMatchesModel{
  getAllMatches(): Promise<IMatch[]>,
  getAllMatchesProgress(inProgress: boolean): Promise<IMatch[]>,
}
