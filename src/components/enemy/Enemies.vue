<template>
    <div class="enemies-wrap">
        <enemy-stone
            :activated="enemies[0].active"
            :enemy-id="0"
            :positions="positions"
            @moved="movedEnemy"
        />
        <enemy-tree
            :activated="enemies[1].active"
            :enemy-id="1"
            :positions="positions"
            @moved="movedEnemy"
        />
        <enemy-stone
            :activated="enemies[2].active"
            :enemy-id="2"
            :positions="positions"
            @moved="movedEnemy"
        />
        <enemy-tree
            :activated="enemies[3].active"
            :enemy-id="3"
            :positions="positions"
            @moved="movedEnemy"
        />
    </div>
</template>

<script>
  import EnemyStone from "@/components/enemy/EnemyStone";
  import EnemyTree from "@/components/enemy/EnemyTree";
  import {store} from "@/lib/store";

  export default {
    name: "Enemies",

    data() {
      return {
        enemies: [
          {active: false, id: 0},
          {active: false, id: 1},
          {active: false, id: 2},
          {active: false, id: 3},
        ],

        positions: {
          start: 450,
          end: -50,
        },

        blocked: false,
      }
    },

    components: {
      EnemyStone,
      EnemyTree,
    },

    computed: {
      started() {
        return store.started;
      },

      gameOver() {
        return store.gameOver;
      },
    },

    watch: {
      started(value) {
        if (value) this.init();
      },
    },

    methods: {
      init() {
        for (let i = 0; i < this.enemies.length; i++) {
          this.enemies[i].active = false;
        }
        this.setActivateEnemy(this.getNextEnemyId(), true);
      },

      /**
       * Прослушивает каждого врага на событие изменения его координат.
       * @param enemy
       */
      movedEnemy(enemy) {
        this.$emit('moved-enemy', enemy);
        if (enemy.x < 40 && !this.blocked) {
          this.blocked = true;
          this.setActivateEnemy(this.getNextEnemyId(), true);
        }
        if (enemy.x < this.positions.end) {
          this.setActivateEnemy(enemy.id, false);
          this.blocked = false;
        }
      },

      setActivateEnemy(enemyId, status) {
        this.enemies[enemyId].active = status;
      },

      getNextEnemyId() {
        const allowedEnemies = this.enemies.filter(enemy => !enemy.active);
        const index = Math.floor(Math.random() * 10) % allowedEnemies.length;

        return allowedEnemies[index].id;
      },
    },
  }
</script>

<style lang="less">
    .enemies-wrap {
        height: 60px;
        &:after {
            content: "";
            display: block;
            clear: both;
        }
        .enemy {
            position: absolute;
            border: 2px solid #cc473f;
            &.hidden {
                display: none;
            }
        }
    }
</style>
