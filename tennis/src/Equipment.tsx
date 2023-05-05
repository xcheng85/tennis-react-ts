import { memo } from 'react';

type Props = {
  onClick: () => void;
};

// export function Equipment({ onClick }: Props) {
//   console.log('render Equipment');
//   return <button onClick={onClick}>Equipment</button>;
// }

// wrap memo around the component
export const Equipment = memo(({ onClick }: Props) => {
  console.log('render Equipment');
  return <button onClick={onClick}>Equipment</button>;
});

Equipment.displayName = 'Equipment';
