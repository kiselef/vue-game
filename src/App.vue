<template>
  <div id="app">
      <div class="stat">
          <points @increased="pointIncreased" />
      </div>
      <div class="main-scene">
          <mover
              ref="mover"
              @start="start"
          />
          <enemies
              ref="enemies"
              @moved-enemy="movedEnemy"
          />
      </div>
      <div class="reload-game" v-if="gameOver">
          <a href="#" @click.prevent="reload">Начать снова</a>
      </div>
  </div>
</template>

<script>
import Mover from "@/components/mover/Mover";
import Enemies from "@/components/enemy/Enemies";
import {mutations, store} from "@/lib/store";
import Points from "@/components/points/Points";

export default {
  name: 'app',

  data() {
    return {

    }
  },

  created() {
    document.addEventListener("keydown", (event) => {
      if (event.code === 'Space') {
        this.$refs.mover.down()
      }
    });
  },

  components: {
    Points,
    Enemies,
    Mover,
  },

  computed: {
    started() {
      return store.started;
    },

    gameOver() {
      return store.gameOver;
    },
  },

  methods: {
    start() {
      if (this.started) {
        return;
      }

      mutations.set('started', true);
    },

    reload() {
      mutations.set('started', false);
      mutations.set('gameOver', false);
    },

    movedEnemy(enemy) {
      const mover = this.$refs.mover;
      if (mover.x2 >= enemy.x && mover.x <= enemy.x2) {
        if (mover.y > -enemy.y2) {
          mutations.gameOver();
        }
      }
    },

    pointIncreased(value) {
      if (value % 200 === 0) {
        mutations.set('level', store.level + 1);
      }
    },
  },
}
</script>

<style lang="less">
#app {
    margin: 160px auto 0 auto;
    width: 500px;
    height: 60px;
    position: relative;
    border-bottom: 1px solid #ccc;
    .reload-game {
        position: absolute;
        z-index:1000;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
    }
}
</style>
