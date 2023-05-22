import { useEffect, useReducer, useRef, useMemo, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query'; // useQuery hooker to get data,
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { getAllPlayers, APOLLO_GET_ALL_PLAYERS_QUERY } from '../api/getAllPlayers'; // think of it as di in angular

import { Player } from '../api/types';
import { PlayersList } from './PlayersList'; // parent-child component

export function PlayersPageApollo() {
  // Apollo's version of useQuery hook
  // aliased loading
  const { loading: isLoading, data } = useQuery(APOLLO_GET_ALL_PLAYERS_QUERY);
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
      <PlayersList players={data.players} />
      <button type="button" onClick={onAddPlayerCB}>
        Add
      </button>
    </div>
  );
}
