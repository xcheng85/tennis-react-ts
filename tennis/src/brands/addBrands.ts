import { NewBrandPayload, NewBrandSuccessResponse } from './types';

export async function addBrand(payload: NewBrandPayload) {
  const response = await fetch(process.env.REACT_APP_BRANDS_WEB_API_URL!, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const body = (await response.json()) as unknown;
  assertIsNewBrandSuccessResponse(body);
  return { ...payload, ...body };
}

function assertIsNewBrandSuccessResponse(
  responseBody: any,
): asserts responseBody is NewBrandSuccessResponse {
  if (!('id' in responseBody)) {
    throw new Error("response from server doesn't contain id");
  }
  if (typeof responseBody.id !== 'number') {
    throw new Error('id is not a number');
  }
}
