<template>
    <div>
        <span>{{ pointsResult }}</span>
    </div>
</template>

<script>
  import intervals from "@/components/mixins/intervals";
  import {store} from "@/lib/store";

  export default {
    name: "Points",

    data() {
      return {
        points: 0,
      }
    },

    mixins: [intervals],

    computed: {
      pointsResult() {
        return `${this.points}`.padStart(8, '0');
      },

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
          this.start();
        } {
          this.points = 0;
        }
      },

      gameOver(value) {
        if (value) {
          this.stop();
        }
      },

      points(value) {
        if (value % 50 === 0) this.$emit('increased', value);
      },
    },

    methods: {
      start() {
        this.addInterval(setInterval(() => {this.points++}, 50));
      },

      stop() {
        this.clearIntervals();
      },
    },
  }
</script>

<style scoped>
    div {
        position: absolute;
        text-align: right;
    }
    span {
        font-weight: bold;
        font-family: monospace;
    }
</style>
