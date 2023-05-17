import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // useQuery hooker to get data,
import { getAllPlayers } from './getAllPlayers'; // think of it as di in angular
import { Player } from './types';
import { PlayersList } from './PlayersList'; // parent-child component

// use react native state management
export function PlayersPageV2() {
  // method3: useQuery hook from react-query
  // TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey,
  // query key is ['players']
  // TData is getAllPlayers
  // alias data to be players, more readability
  const { isLoading, isFetching, data, isError } = useQuery(['players'], getAllPlayers);
  if (isLoading || data === undefined) {
    return <div>Loading ...</div>;
  }
  return (
    <div>
      <h2>All Tennis Players</h2>
      {isFetching ? <div>Fetching...</div> : <PlayersList players={data.players} />}
    </div>
  );
}
