import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import * as actions from './actions';
import { AppState } from './types';

type UpdateCallback = (appState: AppState) => void;

let updateCallbacks: UpdateCallback[] = [];
let appState: AppState = {
  username: null,
  count: 1,
};

const addUpdateCallback = (fn: UpdateCallback) => {
  updateCallbacks.push(fn);
};

const removeUpdateCallback = (fn: UpdateCallback) => {
  updateCallbacks = updateCallbacks.filter(updateCallback => updateCallback !== fn);
};

export const getState = () => appState;
export const setState = (update: Partial<AppState>) => {
  const newState: AppState = { ...appState, ...update };
  appState = newState;
  updateCallbacks.forEach(fn => fn(appState));
};

export const useAppState = <T>(fn: (appState: AppState) => T): T => {
  const [partialAppState, updateCallback] = useState<T>(fn(appState));
  const partialUpdateCallback = useCallback((appState: AppState) => {
    updateCallback(fn(appState));
  }, []);
  useEffect(() => {
    addUpdateCallback(partialUpdateCallback);
    return () => removeUpdateCallback(partialUpdateCallback);
  }, []);
  return partialAppState;
};

export const useActions = () => {
  return actions;
};

export const render = () => {
  ReactDOM.render(React.createElement(App), document.getElementById('root'));
};
