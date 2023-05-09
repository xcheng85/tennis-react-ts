import { Brand } from './types';

export async function getBrands() {
  const response = await fetch(process.env.REACT_APP_BRANDS_WEB_API_URL!);
  // readable stream to json format
  const body = (await response.json()) as unknown;
  assertIsBrands(body);
  // body type from unknown to Brand[]
  return body;
}

// typescript type assertion; assertion signature
export function assertIsBrands(brandsData: unknown): asserts brandsData is Brand[] {
  if (!Array.isArray(brandsData)) {
    throw new Error('brandsData should be array');
  }
  if (brandsData.length === 0) {
    return;
  }
  // in keyword
  brandsData.forEach((brand) => {
    if (!('id' in brand)) {
      throw new Error('brand does not have field:id');
    }
    if (typeof brand.id !== 'number') {
      throw new Error('id field should be number');
    }
    if (!('name' in brand)) {
      throw new Error('brand does not have field:name');
    }
    if (typeof brand.name !== 'string') {
      throw new Error('name field should be string');
    }
    if (!('origin' in brand)) {
      throw new Error('brand does not have field:origin');
    }
    if (typeof brand.origin !== 'string') {
      throw new Error('origin field should be string');
    }
  });
}
