// custom hook
// must start with use
// a custom hook must use hook from react
import { useState } from 'react';
import { IdValue } from './types';

export function useChecked() {
  const [checkedDataIds, setCheckedDataIds] = useState<IdValue[]>([]);
  // currying, fp, purpose is to pass in the checkedId, closure
  // limitation is coming from the onChange event from html element
  const handleCheckDataIdChange = (checkedDataId: IdValue) => () => {
    const isChecked = checkedDataIds.includes(checkedDataId);
    // if checked, then uncheck
    const newCheckedDataIds = isChecked
      ? checkedDataIds.filter((id) => id !== checkedDataId)
      : [...checkedDataIds, checkedDataId];
    setCheckedDataIds(newCheckedDataIds);
  };
  return { checkedDataIds, handleCheckDataIdChange };
}
