import { waitFor, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import addShortcut from '../src';

let callWhenDone = (calls: number, cb: Function) => {
  let currentCalls = 0;

  return () => {
    currentCalls++;

    if (currentCalls >= calls) {
      cb();
    }
  };
};

describe('usage with dom', () => {
  test('fires event', cb => {
    expect.assertions(1);
    let div = document.createElement('div');

    addShortcut(
      'mod+a',
      () => {
        expect(true).toBeTruthy();
        cb();
      },
      div
    );

    fireEvent.keyDown(div, { key: 'a', ctrlKey: true });
  });

  test('uses body ad default context', cb => {
    expect.assertions(1);

    addShortcut('shift+b', () => {
      expect(true).toBeTruthy();
      cb();
    });

    fireEvent.keyDown(document.body, { key: 'b', shiftKey: true });
  });

  test('accepts array of shortcuts', cb => {
    expect.assertions(3);

    let div = document.createElement('div');
    let done = callWhenDone(3, cb);

    addShortcut(
      ['shift+b', 'shift+c', 'mod+9'],
      () => {
        expect(true).toBeTruthy();
        done();
      },
      div
    );

    fireEvent.keyDown(div, { key: 'b', shiftKey: true });
    fireEvent.keyDown(div, { key: 'c', shiftKey: true });
    fireEvent.keyDown(div, { key: '9', ctrlKey: true });
  });

  test('unregisters events', cb => {
    expect.assertions(1);

    let div = document.createElement('div');

    let unregister = addShortcut(
      ['shift+b'],
      () => {
        expect(true).toBeTruthy();
        unregister();
        fireEvent.keyDown(div, { key: 'b', shiftKey: true });
      },
      div
    );

    fireEvent.keyDown(div, { key: 'b', shiftKey: true });

    setTimeout(cb, 200);
  });

  test('does not call function if shortcut is not pressed', cb => {
    expect.assertions(1);

    let div = document.createElement('div');

    addShortcut(
      ['shift+b'],
      () => {
        expect(false).toBeTruthy();
      },
      div
    );

    fireEvent.keyDown(div, { key: '9', ctrlKey: true });
    expect(true).toBeTruthy();

    setTimeout(cb, 200);
  });
});
