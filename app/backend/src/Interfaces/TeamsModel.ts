import ITeams from './Teams';

export default interface ITeamsModel {
  getAllTeams(): Promise<ITeams[]>
}
