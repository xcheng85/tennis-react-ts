import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, defer } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
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
import { getAllPlayers } from './api/getAllPlayers';
import { getCountries } from './api/getCountries';
import { getGenderTypes } from './api/getGenderTypes';
import { PlayersPageV2 } from './players/PlayersPage';
import { PlayersPageApollo } from './players/PlayersPageApollo';
import { AddPlayerV2 } from './players/AddPlayerPage';
import { AddPlayerApollo } from './players/AddPlayerPageApollo';
import { PlayersProfile } from './players/PlayersProfilePage';

const AdminPage = lazy(() => import('./pages/AdminPage'));

// for react-query
// QueryClientProvider is a JSX.element, react component
const queryClient = new QueryClient();
// Use Apollo
const apolloQueryClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL!,
  cache: new InMemoryCache(),
});
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
        // loader: async () => defer({ brands: getBrands() }), // react router loading data
        loader: async () => {
          // use queryClient to check if there is a cache exists, key must match
          const brands = queryClient.getQueriesData(['brands']);
          if (brands) {
            return defer({ brands });
          }
          return defer({ brands: queryClient.fetchQuery(['brands'], getBrands) });
        },
      },
      {
        // nested routes
        path: 'playersV2',
        element: <PlayersPageV2 />, // react element
        loader: async () => {
          // use queryClient to check if there is a cache exists, key must match
          // key: players must be unique
          const players = queryClient.getQueriesData(['players']);
          if (players) {
            return defer({ players });
          }
          return defer({ players: queryClient.fetchQuery(['players'], getAllPlayers) });
        },
      },
      {
        // nested routes
        path: 'playersApollo',
        element: <PlayersPageApollo />, // react element
      },
      {
        path: '/addPlayerV2',
        element: <AddPlayerV2 />,
        loader: async () => {
          // use queryClient to check if there is a cache exists, key must match
          // key: countries must be unique
          let countries: any = queryClient.getQueriesData(['countries']);
          if (!countries) {
            countries = queryClient.fetchQuery(['countries'], getCountries);
          }
          let genderTypes: any = queryClient.getQueriesData(['genderTypes']);
          if (!genderTypes) {
            genderTypes = queryClient.fetchQuery(['genderTypes'], getGenderTypes);
          }
          return defer({ countries, genderTypes });
        },
      },
      {
        path: '/addPlayerApollo',
        element: <AddPlayerApollo />,
      },
      {
        path: '/PlayersProfile',
        element: <PlayersProfile />,
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
// all the routes can access to React Query.
export function Routes() {
  return (
    <ApolloProvider client={apolloQueryClient}>
      {/* <QueryClientProvider client={queryClient}> */}
      <RouterProvider router={router} />
      {/* </QueryClientProvider> */}
    </ApolloProvider>
  );
}
