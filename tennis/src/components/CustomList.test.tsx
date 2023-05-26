// component test naming convention

import { render, screen } from '@testing-library/react';
import { CustomList } from './CustomList';

test('should render correctly when data is specified', () => {
  render(
    <CustomList
      data={[
        { id: 1, name: 'Roger Federer', country: 'Swiss' },
        { id: 2, name: 'Rafa Nadal', country: 'Spain' },
      ]}
      id="id"
      primary="name"
      secondary="country"
    ></CustomList>,
  );
  expect(screen.getByText('Roger Federer')).toBeInTheDocument();
});
