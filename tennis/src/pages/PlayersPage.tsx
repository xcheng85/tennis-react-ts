import { players } from '../data/players';

export function PlayersPage() {
  return (
    <div className="text-center p-5">
      <h2 className="font-bold">ATP Players</h2>
      <ul>
        {players.map((p) => (
          <li key={p.id}>
            {p.lastName} {p.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}
