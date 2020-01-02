<template>
    <div class="enemies-wrap">
        <div v-for="(enemy, index) in enemies" :key="index">
            <component
                :is="enemy.item"
                :activated="enemy.status"
                :enemy-id="enemy.id"
                :positions="positions"
                @moved="movedEnemy"
            />
        </div>
    </div>
</template>

<script>
  import EnemyStone from "@/components/enemy/EnemyStone";
  import EnemyTree from "@/components/enemy/EnemyTree";
  import EnemyTreePair from "@/components/enemy/EnemyTreePair";
  import {store} from "@/lib/store";
  import EnemyBird from "@/components/enemy/EnemyBird";
  import EnemyItem from "@/components/enemy/EnemyItem";

  export default {
    name: "Enemies",

    data() {
      return {
        enemies: [
          {id: 0, status: false, item: EnemyTree},
          {id: 1, status: false, item: EnemyTree},
          {id: 2, status: false, item: EnemyTreePair},
          {id: 3, status: false, item: EnemyTreePair},
          {id: 4, status: false, item: EnemyStone},
          {id: 5, status: false, item: EnemyStone},
          {id: 6, status: false, item: EnemyBird},
        ],

        positions: {
          start: 500,
          end: -50,
        },

        blocked: false,
      }
    },

    components: {
      EnemyItem,
      EnemyBird,
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
        this.activateEnemyById(0);
      },

      activateEnemyById(enemyId) {
        if (!this.enemies[enemyId]) {
          enemyId = this.getNextEnemyId();
        }
        this.enemies[enemyId].status = true;
      },

      /**
       * Прослушивает каждого врага на событие изменения его координат.
       * @param enemy
       */
      movedEnemy(enemy) {
        this.$emit('moved-enemy', enemy);
        if (enemy.x < 40 && !this.blocked) {
          this.blocked = true;
          this.activateEnemyById(this.getNextEnemyId());
        }
        if (enemy.x < this.positions.end) {
          this.enemies[enemy.id].status = false;
          this.blocked = false;
        }
      },

      getNextEnemyId() {
        const nonActiveEnemies = this.enemies.filter(enemy => !enemy.status)
        const index = Math.floor(Math.random() * 100) % nonActiveEnemies.length;
        return nonActiveEnemies[index].id;
      },
    },
  }
</script>

<style lang="less">
    .enemies-wrap {
        &:after {
            content: "";
            display: block;
            clear: both;
        }
        .enemy {
            position: absolute;
            &.hidden {
                display: none;
            }
        }
    }
</style>
