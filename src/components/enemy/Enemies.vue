<template>
    <div class="enemies-wrap">
        <enemy-stone
            :activated="enemies[0].active"
            :enemy-id="0"
            @changed="changedEnemy"
            @moved="movedEnemy"
        />
        <enemy-tree
            :activated="enemies[1].active"
            :enemy-id="1"
            @changed="changedEnemy"
            @moved="movedEnemy"
        />
    </div>
</template>

<script>
  import EnemyStone from "@/components/enemy/EnemyStone";
  import EnemyTree from "@/components/enemy/EnemyTree";
  import {store} from "@/lib/store";
  import intervals from "@/lib/mixins/intervals";

  export default {
    name: "Enemies",

    data() {
      return {
        enemies: [
          {active: false},
          {active: false},
        ],

        sceneBlocked: false,
      }
    },

    mixins: [intervals],

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
      gameOver(value) {
        if (value) this.clearIntervals();
      }
    },

    methods: {
      movedEnemy(y) {
        this.$emit('moved-enemy', y)
      },

      changedEnemy(enemyId, status) {
        this.setActivateEnemy(enemyId, status);
        if (!status) {
          this.sceneBlocked = false;
        }
      },

      init() {
        this.setActivateEnemy(0, true);
        this.addInterval(setInterval(() => {
          if (this.sceneBlocked) return;
          this.setActivateEnemy(this.getRandomEnemyId(), true);
          }, 500)
        );
      },

      setActivateEnemy(enemyId, status) {
        if (status) {
          this.sceneBlocked = true;
        }
        this.enemies[enemyId].active = status;
      },

      getRandomEnemyId() {
        return Math.floor(Math.random() * 10) % 2;
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
