import React, { useState } from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useShortcut } from '../src';

describe('usage with react', () => {
  test('fires event', async () => {
    let div = document.createElement('div');

    let Component = () => {
      let [clicked, setClicked] = useState(false);

      useShortcut('mod+a', () => setClicked(true), [], div);

      return <p>clicked: {'' + clicked}</p>;
    };

    render(<Component />);
    await waitFor(() => screen.getByText('clicked: false'));

    fireEvent.keyDown(div, { key: 'a', ctrlKey: true });

    await waitFor(() => screen.getByText('clicked: true'));
  });
});
