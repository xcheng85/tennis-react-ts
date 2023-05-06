import { FormEvent } from 'react';
import { Link, NavLink, useSearchParams, useNavigate, Form } from 'react-router-dom';

export function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  function handleSearch(e: FormEvent<HTMLFormElement>) {
    // avoid submit again before done
    e.preventDefault();
    // js FormData interface
    const formData = new FormData(e.currentTarget);
    // key matches input name
    const search = formData.get('search') as string;
    // update browser url
    // setSearchParams({ search });
    navigate(`/players/?search=${search}`);
  }
  return (
    <header>
      <Form className="relative text-right" action="/players">
        <input
          className="text-gray-700"
          type="search"
          name="search"
          placeholder="search"
          defaultValue={searchParams.get('search') ?? ''}
        ></input>
      </Form>
      {/* html form */}
      {/* <form className="relative text-right" onSubmit={handleSearch}>
        <input
          className="text-gray-700"
          type="search"
          name="search"
          placeholder="search"
          defaultValue={searchParams.get('search') ?? ''}
        ></input>
      </form> */}
      <Link to="">
        <h1>Tennis Wiki</h1>
      </Link>
      <nav>
        <NavLink to="players">ATP Players</NavLink>
        <NavLink to="admin" className={`border-solid border-b-2`}>
          Admin
        </NavLink>
      </nav>
    </header>
  );
}
