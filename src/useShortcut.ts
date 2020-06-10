import { useEffect } from 'react';
import addShortcut from './index';

export let useShortcut = (
  keys: string | string[],
  handler: (event: KeyboardEvent) => any,
  dependencies?: any[],
  context?: Element
) => {
  useEffect(() => {
    return addShortcut(keys, handler, context);
  }, [keys, handler, context, ...dependencies]);
};
