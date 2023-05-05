import { Link, NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header>
      <h1>Tennis System</h1>
      <nav>
        <NavLink to="players">ATP Players</NavLink>
      </nav>
    </header>
  );
}
