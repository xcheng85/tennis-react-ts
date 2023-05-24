import { CustomList } from './CustomList';

export function PlayersProfile() {
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
        style={{
          width: '1333px',
          maxHeight: '374px',
          overflowY: 'auto',
        }}
      ></CustomList>
    </div>
  );
}
