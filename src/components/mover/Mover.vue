<template>
    <div
        id="mover"
        :style="{bottom: y + 'px', left: x + 'px', width: `${w}px`, height: `${h}px`}"
        :class="{started: this.started, 'leg-up': this.legUp}"
    >
    </div>
</template>

<script>
  import {store} from "@/lib/store";
  import intervals from "@/components/mixins/intervals"

  export default {
    name: "Mover",
    mixins: [intervals],

    data() {
      return {
        x: 50,
        y: 0,

        h: 66,
        w: 45,

        maxY: 100,
        minY: 0,

        step: 3,
        speed: 5,

        relative: 12,
        destination: '',
        legUp: false,
        classInterval: null,
      }
    },

    computed: {
      started() {
        return store.started;
      },

      gameOver() {
        return store.gameOver;
      },

      isOnTop() {
        return this.y >= this.maxY;
      },

      isOnBottom() {
        return this.y <= this.minY;
      },

      inJumping() {
        return this.y !== 0;
      },

      x2() {
        return this.x + this.w - this.relative;
      },

      y2() {
        return this.y + this.h;
      },
    },

    watch: {
      isOnTop(value) {
        if (value) {
          this.down();
        }
      },

      isOnBottom(value) {
        if (value) {
          this.clearIntervals();
        }
      },

      started(value) {
        if (value) {
          this.classInterval = setInterval(() => this.legUp = !this.legUp, 140);
        }
      },

      gameOver(value) {
        if (value) {
          clearInterval(this.classInterval);
        }
      },
    },

    methods: {
      up() {
        if (this.inJumping) {
          return;
        }
        this.destination = 'up';
        this.smoothIncreaseY();
      },

      down() {
        if (this.destination === 'down') {
          return;
        }
        this.clearIntervals();
        this.destination = 'down';
        // небольшая задержка на вершине прыжка
        setTimeout(() => this.smoothDecreaseY(), 145)
      },

      smoothIncreaseY() {
        if (this.isOnTop) {
          return;
        }

        this.moveTop();
        this.addInterval(setInterval(() => this.moveTop(), this.speed));
      },

      smoothDecreaseY() {
        if (this.isOnBottom) {
          this.y = this.minY;
          return;
        }

        this.moveBottom();
        this.addInterval(setInterval(() => this.moveBottom(), this.speed + 2));
      },

      moveTop() {
        this.y += this.step;
      },

      moveBottom() {
        this.y -= this.step;
      },
    },
  }
</script>

<style lang="less" scoped>
    #mover {
        position: absolute;
        cursor: pointer;
        background-size: cover;
        background-image: url("../../img/mover-runner.png");
        background-repeat: no-repeat;
        background-position-y: bottom;
        &.started {
            background-position-y: -10px;
            &.leg-up {
                background-position-y: -76px;
            }
        }
    }
</style>
