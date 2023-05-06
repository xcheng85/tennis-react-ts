import { Link, useSearchParams } from 'react-router-dom';
import { players } from '../data/players';

export function PlayersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  function getFilteredPlayers() {
    const search = searchParams.get('search');
    if (!search || search === '') {
      return players;
    } else {
      return players.filter(({ firstName, lastName }) => {
        const fullname = `${firstName} ${lastName}`;
        return fullname.toLowerCase().includes(search.toLowerCase());
      });
    }
  }

  return (
    <div className="text-center p-5">
      <h2 className="font-bold">ATP Players</h2>
      <ul>
        {getFilteredPlayers().map((p) => (
          <li key={p.id}>
            {/* /players/:id */}
            <Link to={`${p.id}`}>
              {p.lastName} {p.lastName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
