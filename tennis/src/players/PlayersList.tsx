// This component is reusable,
import { Player } from '../api/types';

type Props = {
  players: Player[];
};

export function PlayersList({ players }: Props) {
  return (
    <ul>
      {players.map((player) => (
        <li key={player.id}>
          <h3>
            {player.First} {player.Last}
          </h3>
          <p>{player.Country}</p>
          <p>{player.Gender}</p>
        </li>
      ))}
    </ul>
  );
}
