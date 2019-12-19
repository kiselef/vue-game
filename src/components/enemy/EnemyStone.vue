<template>
    <div
        class="enemy enemy-stone"
        :style="{top: x + 'px', left: y + 'px'}" :class="{started: this.started}"
    ></div>
</template>

<script>
  import {store} from "@/lib/store";
  import intervals from "@/lib/mixins/intervals";

  export default {
    name: "EnemyStone",

    mixins: [intervals],

    data() {
      return {
        x: 0,
        y: 300,
      }
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
        if (value) {
          this.down()
        }
      },

      gameOver(value) {
        if (value) {
          this.clearTimeouts();
        }
      },

      y(value) {
        this.$emit('moved-enemy-stone', this.y);

        if (value < -10) {
          this.y = 300;
        }
      },
    },

    methods: {
      down() {
        this.smoothIncreaseY()
      },

      smoothIncreaseY() {
        if (this.gameOver) {
          return;
        }

        this.y -= 5;
        this.addTimeout(setTimeout(() => {this.smoothIncreaseY()}, 30));
      },

      init() {
        this.y = 100;
      },
    },
  }
</script>

<style lang="less" scoped>
    .enemy {
        &.enemy-stone {
            position: absolute;
            width: 10px;
            height: 15px;
            border: 2px solid #cc473f;
            background-color: #a26423
        }
    }
</style>
