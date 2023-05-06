import { useRouteError } from 'react-router-dom';
import { Header } from '../Header';

function isError(error: any): error is {
  statusText: string;
} {
  return 'statusText' in error;
}

export function ErrorPage() {
  // here we are sure it is a useRouteError due to the config in the Routes.tsx
  const error = useRouteError();

  return (
    <div>
      <Header />
      <div>
        <h1 className="text-slate-900">Internal Error</h1>
        {isError(error) && <p>{error.statusText}</p>}
      </div>
    </div>
  );
}
