<template>
  <div id="app">
      <div class="stat">
          <points @increased="pointIncreased" />
      </div>
      <div class="main-scene">
          <mover
              ref="mover"
              :bullets="bullets"
              @start="start"
              @shoot="shoot"
          />
          <enemies
              ref="enemies"
              @moved-enemy="movedEnemy"
          />
          <div v-for="(bullet, index) in bullets" :key="index">
              <component :is="bullet.item" :started="bullet.started" @moved="bulletMoved" />
          </div>
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
import Bullet from "@/components/bullet/Bullet"

export default {
  name: 'app',

  data() {
    return {
      bullets: [
        {item: Bullet, started: false,},
      ],
    }
  },

  created() {
    document.addEventListener("keydown", (event) => {
      switch (event.code) {
        case 'ArrowUp':
          this.$refs.mover.down();
          break;
        case 'Space':
          this.shoot();
          break;
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

    level() {
      return store.level;
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
        mutations.gameOver();
      }
    },

    isCrossed(mover, enemy) {
      return mover.x2 >= enemy.x && mover.x <= enemy.x2 // пересечение по горизонтали
        && mover.y < enemy.y2 && mover.y2 > enemy.y ;        // по вертикали
    },

    pointIncreased(value) {
      if (value % 200 === 0) {
        mutations.set('level', store.level + 1);
      }
    },

    shoot() {
      if (this.bullets.length) {
        this.bullets[0].started = true;
      }
    },

    bulletMoved(bullet) {
      return bullet;
    },
  },

  watch: {
    level() {
      this.bullets.push({item: Bullet, started: false,})
    },
  },
}
</script>

<style lang="less">
#app {
    margin: 160px auto 0 auto;
    width: 500px;
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
