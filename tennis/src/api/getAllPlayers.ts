// graphql query api
import { gql } from '@apollo/client';
import { Player } from './types';

export const GET_ALL_PLAYERS_QUERY = `
query{
    players(){
      id
      First
      Last
      Country
      Gender
    }
  }
`;

// {
//     "data": {
//       "players": [
//         {
//           "id": "0",
//           "First": "Roger",
//           "Last": "Federer",
//           "Country": "SWISS",
//           "Gender": "MALE"
//         }
//       ]
//     }
//   }

type GetAllPlayersResponse = {
  data: {
    players: Player[];
  };
};

export async function getAllPlayers() {
  // not null assert
  const response = await fetch(process.env.REACT_APP_GRAPHQL_URL!, {
    body: JSON.stringify({
      query: GET_ALL_PLAYERS_QUERY,
    }),
    headers: {
      // body is json format
      'Content-Type': 'application/json',
    },
    method: 'POST', // GraphQL requires POST http verb
  });
  const body = (await response.json()) as unknown;
  assertIsGetAllPlayersResponse(body);
  return body.data;
}

function assertIsGetAllPlayersResponse(response: any): asserts response is GetAllPlayersResponse {
  if (!('data' in response)) {
    throw new Error("response doesn't contain data");
  }
  if (typeof response.data !== 'object') {
    throw new Error('response is not an object');
  }
  if (!('players' in response.data)) {
    throw new Error("data doesn't contain players");
  }
  // all derived data type is always a type object.
  // In case you need to check if it’s an array you can use isArray method of Array.
  if (!Array.isArray(response.data.players)) {
    throw new Error('players is not an array');
  }
  response.data.players.forEach((player: any) => {
    if (!('id' in player)) {
      throw new Error("player doesn't contain id");
    }
    if (typeof player.id !== 'string') {
      throw new Error('player id is not a string');
    }
    if (!('First' in player)) {
      throw new Error("player doesn't contain First");
    }
    if (typeof player.First !== 'string') {
      throw new Error('player First is not a string');
    }
    if (!('Last' in player)) {
      throw new Error("player doesn't contain Last");
    }
    if (typeof player.Last !== 'string') {
      throw new Error('player Last is not a string');
    }
    if (!('Country' in player)) {
      throw new Error("player doesn't contain Country");
    }
    if (typeof player.Country !== 'string') {
      throw new Error('player Country is not a string');
    }
    if (!('Gender' in player)) {
      throw new Error("player doesn't contain Gender");
    }
    if (typeof player.Gender !== 'string') {
      throw new Error('player Gender is not a string');
    }
  });
}

// tagged template literal, gql function
// no () after query
export const APOLLO_GET_ALL_PLAYERS_QUERY = gql`
  query {
    players {
      id
      First
      Last
      Country
      Gender
    }
  }
`;
