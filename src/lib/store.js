import vue from 'vue';

let store = vue.observable({
  started: false,
  gameOver: false,
  level: 1,
  positionStart: 0,
  positionEnd: 400,
});

let mutations = {
  start() {
    store.started = true;
  },

  set(key, value) {
    store[key] = value;
  },
};

export {store, mutations};
