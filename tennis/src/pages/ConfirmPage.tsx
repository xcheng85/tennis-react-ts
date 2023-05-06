import { useParams } from 'react-router-dom';

type Params = {
  // must be string, since it is from the router path
  name: string;
};

export function ConfirmPage() {
  const { name } = useParams<Params>();
  return <div className="flex flex-col">Player: {name} has been successfully added</div>;
}
