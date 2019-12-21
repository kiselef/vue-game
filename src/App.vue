<template>
  <div id="app">
    <mover
      ref="mover"
      @start="start"
    />
    <enemies
      ref="enemies"
      @moved-enemy="enemyMoved"
    />
  </div>
</template>

<script>
import Mover from "@/components/mover/Mover";
import Enemies from "@/components/enemy/Enemies";
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
    Enemies,
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
      const mover = this.$refs.mover;
      if (link <= mover.y + mover.w && link >= mover.y) {
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
