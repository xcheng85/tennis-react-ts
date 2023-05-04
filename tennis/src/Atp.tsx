// define prop type

import { useEffect, useReducer } from 'react';
import { getAtpPlayers } from './getPlayers';

// state in one single object
type State = {
  name: string | undefined;
  birthYear: number;
  title: number;
};

// type is used to do implicient type deduction
// set* is after data fetching
// increase* is for long running process
type Action =
  | {
      type: 'init';
      name: string;
      birthYear: number;
      title: number;
    }
  | {
      type: 'increaseTitle';
    }
  | {
      type: 'setTitle';
      title: number;
    }
  | {
      type: 'setBirthYear';
      year: number;
    };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'init':
      return { name: action.name, title: action.title, birthYear: action.birthYear };
    case 'increaseTitle':
      // spread syntex, copy
      return { ...state, title: state.title + 1 };
    case 'setTitle':
      return { ...state, title: action.title };
    case 'setBirthYear':
      return { ...state, title: action.year };
    default:
      return state;
  }
}

export function Atp() {
  // state: player name
  // number of title
  const initState: State = {
    name: undefined,
    birthYear: 0,
    title: 0,
  };
  // [state, dispatch]
  const [{ name, birthYear, title }, dispatch] = useReducer(reducer, initState);
  //
  useEffect(() => {
    getAtpPlayers().then((p) => {
      // update state value is not immediate, wait for the next renderer
      const { name, birthYear, title } = p;
      dispatch({ type: 'init', name, birthYear, title });
    });
  }, []);
  // no dom
  if (name && birthYear && title !== undefined) {
    return (
      <div>
        <h3>
          {name}, {birthYear}, GrandSlams: {title}
        </h3>
        <button onClick={() => dispatch({ type: 'increaseTitle' })}>WinGrandSlam</button>
      </div>
    );
  } else {
    return null;
  }
}
