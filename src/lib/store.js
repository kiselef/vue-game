import vue from 'vue';

let store = vue.observable({
  started: false,
  gameOver: false,
  level: 1,
});

let mutations = {
  start() {
    store.started = true;
  },
  gameOver() {
    store.gameOver = true;
  },
  set(key, value) {
    store[key] = value;
  },
};

export {store, mutations};
