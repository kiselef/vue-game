import vue from 'vue';

let store = vue.observable({
  started: false,
  gameOver: false,
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
