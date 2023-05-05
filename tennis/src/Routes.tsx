import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PlayersPage } from './pages/PlayersPage';

// RouteObjects
const router = createBrowserRouter([
  {
    path: 'players',
    element: <PlayersPage />, // react element
  },
]);

// Routes component
// router is the prop of RouterProvider component
export function Routes() {
  return <RouterProvider router={router} />;
}
