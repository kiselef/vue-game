<template>
  <div id="app">
    <mover
      ref="mover"
      @start="start"
    />
    <enemy
      ref="enemies"
      @moved-enemy-stone="enemyMoved"
    />
  </div>
</template>

<script>
import Mover from "@/components/mover/Mover";
import Enemy from "@/components/enemy/Enemy";
import {mutations, store} from "@/lib/store";

export default {
  name: 'app',

  data() {
    return {

    }
  },

  mounted() {
    document.addEventListener("keydown", (event) => {
      if (event.code === 'Space') {
        this.$refs.mover.down()
      }
    });
  },

  components: {
    Enemy,
    Mover,
  },

  computed: {
    started() {
      return store.started;
    },
  },

  methods: {
    start() {
      if (this.started) {
        return;
      }

      mutations.start();
    },

    enemyMoved(link) {
      if (link <= 20 && link >= 0) {
        if (this.$refs.mover.x > -15) {
          console.log('game over');
          mutations.gameOver();
        }
      }
    },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 160px auto 0 auto;
  width: 500px;
  height: 60px;
  position: relative;
  border-bottom: 1px solid #ccc;
}
</style>
