// custom hook
// must start with use
// a custom hook must use hook from react
import { useState, useEffect } from 'react';
import { IdValue } from './types';

// custom hook with input parameters
// Props for react component
// Params for hook
type Params = {
  checkedDataIds?: IdValue[]; // initial state
  onCheckedDataIdsChange?: (checkedDataIds: IdValue[]) => void; // custom handler
};

// resolved means the real state
export function useChecked({ checkedDataIds, onCheckedDataIdsChange }: Params) {
  const [resolvedCheckedDataIds, setResolvedCheckedDataIds] = useState<IdValue[]>([]);
  // currying, fp, purpose is to pass in the checkedId, closure
  // limitation is coming from the onChange event from html element
  const handleCheckDataIdChange = (checkedDataId: IdValue) => () => {
    const isChecked = resolvedCheckedDataIds.includes(checkedDataId);
    // if checked, then uncheck
    const newCheckedDataIds = isChecked
      ? resolvedCheckedDataIds.filter((id) => id !== checkedDataId)
      : [...resolvedCheckedDataIds, checkedDataId];
    if (onCheckedDataIdsChange) {
      // let consumer modify internal behavior
      onCheckedDataIdsChange(newCheckedDataIds);
    } else {
      //default behavior
      setResolvedCheckedDataIds(newCheckedDataIds);
    }
  };
  // side effects
  // input of the component changes, resync
  useEffect(() => {
    // caveat: null is treated as no checks.
    if (checkedDataIds != undefined) {
      setResolvedCheckedDataIds(checkedDataIds);
    }
  }, [checkedDataIds]);
  return { resolvedCheckedDataIds, handleCheckDataIdChange };
}
