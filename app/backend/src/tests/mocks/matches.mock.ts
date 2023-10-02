const macthesAll = [
    {
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: false,
    },
    {
      id: 2,
      homeTeamId: 9,
      homeTeamGoals: 1,
      awayTeamId: 14,
      awayTeamGoals: 1,
      inProgress: false,
    }
];

const matchesInProgressTrue = [
    {
        id: 41,
        homeTeamId: 16,
        homeTeamGoals: 2,
        awayTeamId: 9,
        awayTeamGoals: 0,
        inProgress: true,
      },
      {
        id: 42,
        homeTeamId: 6,
        homeTeamGoals: 1,
        awayTeamId: 1,
        awayTeamGoals: 0,
        inProgress: true,
      }
];

const matchesInProgressFalse = [
    {
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: false,
    },
    {
      id: 2,
      homeTeamId: 9,
      homeTeamGoals: 1,
      awayTeamId: 14,
      awayTeamGoals: 1,
      inProgress: false,
    }
 ];

 const matchUpdateGoals = {
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}


export {
    macthesAll,
    matchesInProgressTrue,
    matchesInProgressFalse,
    matchUpdateGoals,
}