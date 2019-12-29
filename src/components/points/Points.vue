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
        }
      },

      gameOver(value) {
        if (value) {
          this.stop();
        }
      },

      points(value) {
        this.$emit('increased', value);
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
    span {
        font-weight: bold;
    }
</style>
