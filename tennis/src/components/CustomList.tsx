import { ComponentPropsWithoutRef, ReactNode, useState } from 'react';
// use custom hook
import { useChecked } from './useChecked';

type Props<Data> = {
  data: Data[];
  id: keyof Data;
  primary: keyof Data;
  secondary: keyof Data;
  renderer?: (item: Data) => ReactNode; // how to render a data
} & ComponentPropsWithoutRef<'ul'>;

export function CustomList<Data>({
  data,
  id,
  primary,
  secondary,
  renderer,
  ...ulProps
}: Props<Data>) {
  const { checkedDataIds, handleCheckDataIdChange } = useChecked();
  return (
    <ul className="bg-gray-300 rounded p-10" {...ulProps}>
      {data.map((d) => {
        if (renderer) {
          return renderer(d);
        }
        const dataId = d[id] as unknown;
        if (typeof dataId !== 'string' && typeof dataId !== 'number') {
          return null;
        }
        const p = d[primary] as unknown;
        if (typeof p !== 'string') {
          return null;
        }
        const s = d[secondary] as unknown;
        return (
          <li key={dataId} className="bg-white shadow rounded">
            <label className="flex item-center">
              <input
                type="checkbox"
                checked={checkedDataIds.includes(dataId)}
                onChange={handleCheckDataIdChange(dataId)}
              ></input>
              <div className="ml-2">
                <div className="text-xl text-red-800">{p}</div>
                {typeof s === 'string' && <div className="text-sm text-grey-200">{s}</div>}
              </div>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
