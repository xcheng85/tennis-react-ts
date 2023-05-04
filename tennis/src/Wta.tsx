// define prop type

import { useEffect, useState } from 'react';
import { getWtaPlayers } from './getPlayers';

export function Wta() {
  // state: player name
  // number of title
  const [name, setName] = useState<string | undefined>();
  const [birthYear, setBirthYear] = useState<number | undefined>();

  useEffect(() => {
    getWtaPlayers().then((p) => {
      // update state value is not immediate, wait for the next renderer
      setName(p.name);
      setBirthYear(p.birthYear);
    });
  }, []);
  // no dom
  if (name && birthYear) {
    return (
      <div>
        <h3>
          {name}, {birthYear}
        </h3>
      </div>
    );
  } else {
    return null;
  }
}
