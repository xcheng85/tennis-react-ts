import { FormEvent } from 'react';
import { Link, NavLink, useSearchParams, useNavigate, Form } from 'react-router-dom';
// redux state
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from './store/store';
import {
  authenticateAction,
  authenticatedAction,
  authorizeAction,
  authorizedAction,
} from './store/userSlice';
import { authenticate } from './api/authenticate';
import { authorize } from './api/authorize';

export function Header() {
  // navigate route by params
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
  // store state selection
  // first .user is state slice
  const user = useSelector((state: StoreState) => state.user.user);
  const loading = useSelector((state: StoreState) => state.user.loading);
  const dispatch = useDispatch();
  async function handleSignInClick() {
    dispatch(authenticateAction());
    const authenticatedUser = await authenticate();
    dispatch(authenticatedAction(authenticatedUser));
    if (authenticatedUser !== undefined) {
      dispatch(authorizeAction());
      const authorizedRoles = await authorize(authenticatedUser.id);
      dispatch(authorizedAction(authorizedRoles));
    }
  }
  return (
    <header>
      <div>
        {user ? (
          <span className="font-bold">{user.name} has signed in</span>
        ) : (
          <button onClick={handleSignInClick} disabled={loading}>
            {loading ? '...' : 'Sign in'}
          </button>
        )}
      </div>
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
