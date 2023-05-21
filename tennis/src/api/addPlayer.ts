export const ADD_PLAYER = `
  mutation ($first: String!, $last: String!, $country: Country!, $gender: GenderType!){
    addPlayer(player: {First: $first, Last: $last, Country: $country, Gender: $gender}){
      id
    }
  }
`;

// The following two matched the graphql schema
// Introspection
export enum GenderType {
  MALE,
  FEMALE,
}

export enum Country {
  CHINA,
}

// limitation of react query's useMutation limitation
// https://medium.com/swlh/how-to-use-multiple-parameters-in-usemutation-from-react-query-with-typescript-7e2aeec51446
export type addPlayerPayload = {
  first: string;
  last: string;
  country: Country;
  gender: GenderType;
};

// to be called by mutate of react-query hook, only take 1 param
export async function addPlayer(payload: addPlayerPayload) {
  const { first, last, country, gender } = payload;
  // not null assert
  const response = await fetch(process.env.REACT_APP_GRAPHQL_URL!, {
    body: JSON.stringify({
      query: ADD_PLAYER,
      variables: {
        first,
        last,
        country,
        gender,
      },
    }),
    headers: {
      // body is json format
      'Content-Type': 'application/json',
    },
    method: 'POST', // GraphQL requires POST http verb
  });
  const res = await response.json();
  console.info(res);
}
