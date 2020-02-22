import React from 'react';
import { useActions, useAppState } from './state';

export const App = () => (
  <>
    <UsernameControl />
    <CountControl />
  </>
);

const UsernameControl = () => {
  console.log('UsernameControl render');
  const { username } = useAppState();
  const actions = useActions();
  return (
    <div>
      <p>Hello {username || '...'}</p>
      <input value={username ?? ''} onChange={e => actions.setUsername(e.target.value)} />
    </div>
  );
};

const CountControl = () => {
  console.log('CountControl render');
  const { count } = useAppState();
  const actions = useActions();
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => actions.increaseCount()}>+1</button>
    </div>
  );
};
