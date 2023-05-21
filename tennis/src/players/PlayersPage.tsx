import { useEffect, useReducer, useRef, useMemo, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // useQuery hooker to get data,
import { useNavigate } from 'react-router-dom';
import { getAllPlayers } from '../api/getAllPlayers'; // think of it as di in angular

import { Player } from '../api/types';
import { PlayersList } from './PlayersList'; // parent-child component

// use react native state management
export function PlayersPageV2() {
  // method3: useQuery hook from react-query
  // TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey,
  // query key is ['players']
  // TData is getAllPlayers
  // alias data to be players, more readability
  const { isLoading, isFetching, data, isError } = useQuery(['players'], getAllPlayers);
  // navigate to Players page.
  const navigate = useNavigate();
  const onAddPlayerCB = useCallback(() => {
    navigate(`/addPlayerV2`);
  }, []);
  if (isLoading || data === undefined) {
    return <div>Loading ...</div>;
  }
  return (
    <div>
      <h2>All Tennis Players</h2>
      {isFetching ? <div>Fetching...</div> : <PlayersList players={data.players} />}
      <button type="button" onClick={onAddPlayerCB}>
        Add
      </button>
    </div>
  );
}
