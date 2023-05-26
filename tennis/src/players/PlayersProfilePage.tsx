import { useState } from 'react';
import { IdValue } from '../components/types';
import { CustomList } from '../components/CustomList';

// PlayersProfile is built upon CustomList react component
// PlayersProfile wants to control the initial state
// PlayersProfile wants to control only one item could be checked at all times

// state management of PlayersProfile
// 1. useState
// 2. useContext
// 3. redux

export function PlayersProfile() {
  // null is treated as no checks
  // only one playerId could be checked, initially it is null, no check
  const [checkedPlayerId, setCheckedPlayerId] = useState<IdValue | null>(null);
  function handleCheckedPlayerIdChange(newCheckedPlayerIds: IdValue[]) {
    // shared component maintain list of checkedid.
    // logic to make sure of only one checked is done here
    const newCheckedIds = newCheckedPlayerIds.filter((id) => id !== checkedPlayerId);
    if (newCheckedIds.length == 1) {
      // checked a different player
      setCheckedPlayerId(newCheckedIds[0]);
    } else {
      setCheckedPlayerId(null);
    }
  }
  return (
    <div className="p-10">
      <CustomList
        data={[
          { id: 1, name: 'Roger Federer', country: 'Swiss' },
          { id: 2, name: 'Rafa Nadal', country: 'Spain' },
        ]}
        id="id"
        primary="name"
        secondary="country"
        // renderer={(e) => (
        //   <li key={e.id} className="bg-red shadow rounded">
        //     <div className="text-xl text-yellow-800">{e.name}</div>
        //     <div className="text-sm text-green-200">{e.country}</div>
        //   </li>
        // )}
        // adaptor
        checkedDataIds={checkedPlayerId === null ? [] : [checkedPlayerId]}
        onCheckedDataIdsChange={handleCheckedPlayerIdChange}
        style={{
          width: '1333px',
          maxHeight: '374px',
          overflowY: 'auto',
        }}
      ></CustomList>
    </div>
  );
}
