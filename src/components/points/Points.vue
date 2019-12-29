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
        return `${this.points}`.padStart(10, '0');
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
        console.log(value);
        if (value) {
          this.start();
        }
      },

      gameOver(value) {
        if (value) {
          this.stop();
        }
      }
    },

    methods: {
      start() {
        this.addInterval(setInterval(() => {this.points++}, 100));
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
