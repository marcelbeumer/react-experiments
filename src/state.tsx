import React, { memo, useContext } from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import * as actions from './actions';
import { AppState } from './types';

const MemoApp = memo(App);
let appState: AppState = {
  username: null,
  count: 1,
};

export const getState = () => appState;
export const setState = (update: Partial<AppState>) => {
  const newState: AppState = { ...appState, ...update };
  appState = newState;
  render();
};

const AppStateContext = React.createContext<AppState>(appState);

export const useActions = () => actions;
export const useAppState = () => {
  return useContext(AppStateContext);
};

export const render = () => {
  ReactDOM.render(
    <AppStateContext.Provider value={appState}>
      <MemoApp />
    </AppStateContext.Provider>,
    document.getElementById('root')
  );
};
