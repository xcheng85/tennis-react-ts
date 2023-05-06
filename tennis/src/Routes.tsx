import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { Header } from './Header';
import { HomePage } from './pages/HomePage';
import { PlayersPage } from './pages/PlayersPage';
import { PlayerPage } from './pages/PlayerPage';
import { ErrorPage } from './pages/ErrorPage';

const AdminPage = lazy(() => import('./pages/AdminPage'));
// RouteObjects
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
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
      {
        path: 'admin',
        element: (
          <Suspense fallback={<div>Lazy Loading...</div>}>
            <AdminPage />
          </Suspense>
        ),
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
