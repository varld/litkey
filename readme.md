<h1 align="center">Litkey</h1>

<p align="center">🔥 Litkey makes keyboard shortcuts simple and enjoyable.</p>

## Install

```bash
# Using npm
npm install litkey

# Using yarn
yarn add litkey
```

## Usage

```typescript
import litkey from 'litkey';

// Add a global keyboard shortcut
litkey('mod+k', () => {
  // do something
});

// Add a keyboard shortcut to a specific element
litkey('mod+k', () => {
  // do something
}, myElement);
```

## Usage with React

```tsx
import { useShortcut } from 'litkey';

let Component = () => {
  let [clicked, setClicked] = useState(false);

  useShortcut('mod+a', () => {
    setClicked(true);
  });

  // You can also specify hook dependencies which will 
  // get passed on to the underlying useEffect
  useShortcut('mod+k', () => {
    setClicked(true);
  }, [/* react hook dependency list */]);

  // Using the fourth parameter, you can specify a
  // specific DOM element, in which the keyboard 
  // shortcut will be fired
  useShortcut('mod+k', () => {
    setClicked(true);
  }, [], myElement);

  return (
    <p>{ clicked ? 'clicked' : 'not clicked' }</p>
  );
};
```

## API

### `litkey(shortcut, handler, [context])`

The `litkey` function is the default export of litkey.

#### `shortcut: string | string[]`

`shortcut` is a `string` or an `array of strings`, which specify the key combinations which will fire the callback.

#### `handler: (event: KeyboardEvent) => any`

The `handler` is a callback function which will be called if the keyboard shortcut is pressed. 
It receives the `KeyboardEvent` as its first parameter.

#### `context?: HTMLElement`

The context is optional and can be used to specify the `HTMLElement`, in which litkey will listen for keyboard shortcuts.

### `useShortcut(shortcut, handler, [dependencies, [context]])`

#### `shortcut: string | string[]`

`shortcut` is a `string` or an `array of strings`, which specify the key combinations which will fire the callback.

#### `handler: (event: KeyboardEvent) => any`

The `handler` is a callback function which will be called if the keyboard shortcut is pressed. 
It receives the `KeyboardEvent` as its first parameter.

#### `dependencies: any[]`

`dependencies` is an optional array, which will be passed on directly to `useEffect` to serve as React hook dependencies.

#### `context?: HTMLElement`

`context` is optional and can be used to specify the `HTMLElement`, in which litkey will listen for keyboard shortcuts.

## License

MIT © [Tobias Herber](https://herber.space)
