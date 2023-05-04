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
