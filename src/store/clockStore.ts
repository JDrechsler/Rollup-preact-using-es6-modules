import { store } from 'z-preact-easy-state';

export const clockStore = store({
  num: 0,
  clockIntervalIsRunning: false
});
