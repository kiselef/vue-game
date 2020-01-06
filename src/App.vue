<template>
  <div id="app">
      <div class="stat">
          <points @increased="pointIncreased" />
      </div>
      <div class="main-scene">
          <mover
              ref="mover"
          />
          <enemies
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
      switch (event.code) {
        case 'Space':
          this.$refs.mover.up();
          this.start();
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.code) {
        case 'Space':
          this.$refs.mover.down();
          break;
      }
    });

    const {start, end} = this.getScenePositions();
    mutations.set('positionStart', start);
    mutations.set('positionEnd', end);
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
      if (this.isCrossed(mover, enemy)) {
        mutations.set('gameOver', true);
      }
    },

    isCrossed(mover, enemy) {
      return mover.x2 >= enemy.x && mover.x <= enemy.x2 // пересечение по горизонтали
        && mover.y < enemy.y2 && mover.y2 > enemy.y ;   // по вертикали
    },

    pointIncreased(value) {
      if (value % 200 === 0) {
        mutations.set('level', store.level + 1);
      }
    },

    getScenePositions() {
      const {clientWidth: end} = document.getElementById('app');
      return { end, start: 0 }
    },
  },
}
</script>

<style lang="less">
    @media (max-width: 600px) {
        #app {
            width: 100%;
        }
    }

    @media (min-width: 800px) {
        #app {
            width: 600px;
        }
    }

    #app {
        margin: 200px auto 0 auto;
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
