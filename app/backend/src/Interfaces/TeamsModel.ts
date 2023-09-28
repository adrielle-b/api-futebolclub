import ITeams from './Teams';

export default interface ITeamsModel {
  getAllTeams(): Promise<ITeams[]>
  getTeamById(id: number): Promise<ITeams | null>
}
