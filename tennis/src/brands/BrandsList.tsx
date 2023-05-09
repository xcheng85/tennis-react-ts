// This component is reusable,
import { Brand } from './types';

type Props = {
  brands: Brand[];
};

export function BrandsList({ brands }: Props) {
  return (
    <ul>
      {brands.map((brand) => (
        <li key={brand.id}>
          <h3>{brand.name}</h3>
          <p>{brand.origin}</p>
        </li>
      ))}
    </ul>
  );
}
