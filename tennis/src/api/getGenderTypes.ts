import { GenderType } from './addPlayer';

// graphql type introspect
export const GET_GENDER_TYPE_QUERY = `
query{
    __type(name: "GenderType") {
      name
      kind
      enumValues {
        name
      }
    }
  }
`;

type GetGenderTypeResponse = {
  data: {
    __type: {
      name: string;
      kind: string;
      enumValues: { name: GenderType }[];
    };
  };
};

export async function getGenderTypes() {
  // not null assert
  const response = await fetch(process.env.REACT_APP_GRAPHQL_URL!, {
    body: JSON.stringify({
      query: GET_GENDER_TYPE_QUERY,
    }),
    headers: {
      // body is json format
      'Content-Type': 'application/json',
    },
    method: 'POST', // GraphQL requires POST http verb
  });
  const body = (await response.json()) as unknown;
  assertIsGetGenderTypeResponse(body);
  return body.data.__type.enumValues.map((v) => v.name);
}

function assertIsGetGenderTypeResponse(response: any): asserts response is GetGenderTypeResponse {
  if (!('data' in response)) {
    throw new Error("response doesn't contain data");
  }
  if (typeof response.data !== 'object') {
    throw new Error('response is not an object');
  }
  if (!('__type' in response.data)) {
    throw new Error("data doesn't contain __type");
  }
  if (!('name' in response.data.__type)) {
    throw new Error("data.__type doesn't contain name");
  }
  if (!('kind' in response.data.__type)) {
    throw new Error("data.__type doesn't contain kind");
  }
  if (!('enumValues' in response.data.__type)) {
    throw new Error("data.__type doesn't contain enumValues");
  }
  if (response.data.__type.name !== 'GenderType') {
    throw new Error('data.__type.name is not GenderType');
  }
  if (response.data.__type.kind !== 'ENUM') {
    throw new Error('data.__type.kind is not ENUM');
  }
  if (!response.data.__type.enumValues) {
    throw new Error('data.__type.enumValues is null');
  }
}
