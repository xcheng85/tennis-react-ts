import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { Header } from './Header';
import { PlayersPage } from './pages/PlayersPage';
import { PlayerPage } from './pages/PlayerPage';
import { ErrorPage } from './pages/ErrorPage';

// RouteObjects
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        // nested routes
        path: 'players',
        element: <PlayersPage />, // react element
      },
      {
        // routes with param
        path: 'players/:id',
        element: <PlayerPage />, // react element
      },
    ],
  },
  //   {
  //     path: 'players',
  //     element: <PlayersPage />, // react element
  //   },
]);

// Routes component
// router is the prop of RouterProvider component
export function Routes() {
  return <RouterProvider router={router} />;
}
