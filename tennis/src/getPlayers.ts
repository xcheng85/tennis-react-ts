type Player = {
  name: string;
  birthYear: number;
  title: number;
};

export function getAtpPlayers(): Promise<Player> {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ name: 'Roger Federer', birthYear: 1981, title: 20 }), 100),
  );
}

export function getWtaPlayers(): Promise<Player> {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ name: 'Iga Swaitek', birthYear: 2001, title: 3 }), 100),
  );
}

export function generateBotAtpPlayers(n: number): Player[] {
  console.log('generateBotAtpPlayers');
  const players: Player[] = [];
  const min = 1980;
  const max = 2007;
  for (let i = 0; i < n; i++) {
    players.push({
      name: `player_${i}`,
      birthYear: Math.floor(Math.random() * (max - min + 1)) + min,
      title: 0,
    });
  }
  return players;
}
