import { store } from 'z-preact-easy-state';

export const customStore = store({
  name: 'JD',
  favFood: 'pizza',
  btnClicked: 0,
  AI: {
    aiLibsReady: false,
    probabilityHuman: 0,
    probabilityNonHuman: 0
  }
});
