import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, defer } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { Header } from './Header';
import { HomePage } from './pages/HomePage';
import { PlayersPage } from './pages/PlayersPage';
import { PlayerPage } from './pages/PlayerPage';
import { ErrorPage } from './pages/ErrorPage';
import { ConfirmPage } from './pages/ConfirmPage';
import { AddPlayer } from './pages/AddPlayer';
import { BrandsPage } from './brands/BrandsPage';
import { getBrands } from './brands/getBrands';

const AdminPage = lazy(() => import('./pages/AdminPage'));

// for react-query
// QueryClientProvider is a JSX.element, react component
const queryClient = new QueryClient();
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
      {
        path: 'confirm/:name',
        element: <ConfirmPage />,
      },
      {
        path: '/addPlayer',
        element: <AddPlayer />,
      },
      {
        // nested routes
        path: 'brands',
        element: <BrandsPage />, // react element
        // async defer to improve the performance in case getBrands took long time to complete
        loader: async () => defer({ brands: getBrands() }), // react router loading data
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
// all the routes can access to React Query
export function Routes() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
