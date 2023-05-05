import { useParams } from 'react-router-dom';
import { players } from '../data/players';

type Params = {
  // must be string, since it is from the router path
  id: string;
};

export function PlayerPage() {
  // params is partial
  const params = useParams<Params>();
  // type assertion is needed
  let id: number | undefined = undefined;
  if (params.id) {
    id = +params.id;
  }
  const player = players.find((p) => p.id === id);
  return (
    <div>
      {!player ? (
        <h1>Player Not Exist</h1>
      ) : (
        <>
          <h1>
            {player.firstName} {player.lastName}
          </h1>
          <p>{player.birthPlace}</p>
          <p>{player.turnProYear}</p>
        </>
      )}
    </div>
  );
}
