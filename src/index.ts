import { parseHotkey, compareHotkey, HotKey } from 'is-hotkey';

let addShortcut = (
  keys: string | string[],
  handler: (event: KeyboardEvent) => any,
  context: Element = document.body
) => {
  let hotkeys: HotKey[] = [];

  if (Array.isArray(keys)) {
    for (let key of keys) {
      hotkeys.push(parseHotkey(key, { byKey: true }));
    }
  } else {
    hotkeys.push(parseHotkey(keys, { byKey: true }));
  }

  let internalHandler = (event: KeyboardEvent) => {
    let passed = false;

    for (let hotkey of hotkeys) {
      passed = compareHotkey(hotkey, event);

      if (passed) break;
    }

    if (passed) {
      handler(event);
    }
  };

  context.addEventListener('keydown', internalHandler);

  return () => {
    context.removeEventListener('keydown', internalHandler);
  };
};

export default addShortcut;
export * from './useShortcut';
