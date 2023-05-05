export type Player = {
  id: number;
  firstName: string;
  lastName: string;
  rank: number;
  birthPlace: string;
  turnProYear: number;
};

export const players: Player[] = [
  {
    id: 0,
    firstName: 'Roger',
    lastName: 'Federer',
    rank: 1,
    birthPlace: 'Basel, Switzerland',
    turnProYear: 1999,
  },
  {
    id: 1,
    firstName: 'Rafa',
    lastName: 'Nadal',
    rank: 2,
    birthPlace: 'Manacor, Mallorca, Spain',
    turnProYear: 2001,
  },
];
