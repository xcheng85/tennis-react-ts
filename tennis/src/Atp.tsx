import { useEffect, useReducer, useRef, useMemo, useCallback } from 'react';
import { getAtpPlayers, generateBotAtpPlayers } from './getPlayers';
import { Equipment } from './Equipment';

// state in one single object
type State = {
  name: string | undefined;
  birthYear: number;
  title: number;
  loading: boolean;
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
      return {
        name: action.name,
        title: action.title,
        birthYear: action.birthYear,
        loading: false,
      };
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
    loading: true,
  };
  // [state, dispatch]
  const [{ name, birthYear, title, loading }, dispatch] = useReducer(reducer, initState);
  // HTMLButtonElement is react typescript types for html elements
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    getAtpPlayers().then((p) => {
      // update state value is not immediate, wait for the next renderer
      const { name, birthYear, title } = p;
      dispatch({ type: 'init', name, birthYear, title });
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      //: HTMLButtonElement | null
      // optional chaining operator
      buttonRef.current?.focus();
    }
  }, [loading]);

  const f = useMemo(() => generateBotAtpPlayers(10000), []);

  // without memo
  // function handleEquipment() {
  //   // to do
  // }
  const handleEquipment = useCallback(() => {
    // to do
    // did not render during profiling session
  }, []);

  // no dom
  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h3>
          {name}, {birthYear}, GrandSlams: {title}
        </h3>
        <button ref={buttonRef} onClick={() => dispatch({ type: 'increaseTitle' })}>
          WinGrandSlam
        </button>
        <p>{f.length}</p>
        <Equipment onClick={handleEquipment}></Equipment>
      </div>
    );
  }
}
