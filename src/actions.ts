import { setState, getState } from './state';

export function setUsername(username: string) {
  setState({ username });
}

export function increaseCount() {
  setState({ count: getState().count + 1 });
}
