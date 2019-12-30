<template>
    <div
        id="mover"
        @click="down"
        :style="{top: y + 'px', left: x + 'px', width: `${w}px`, height: `${h}px`}"
        :class="{started: this.started}"
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
        x: 0,
        y: 0,

        h: 70,
        w: 45,

        maxY: -100,
        minY: 0,

        step: 3,
        speed: 10,

        relative: 10,
      }
    },

    computed: {
      started() {
        return store.started;
      },

      isOnTop() {
        return this.y <= this.maxY;
      },

      isOnBottom() {
        return this.y >= this.minY;
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
          this.clearIntervals();
          this.addTimeout(setTimeout(() => this.smoothDecreaseY(), 130));
        }
      },

      isOnBottom(value) {
        if (value) {
          this.clearIntervals();
        }
      },
    },

    methods: {
      down() {
        if (this.inJumping) {
          return;
        }
        this.$emit('start');
        this.smoothIncreaseY();
      },

      smoothIncreaseY() {
        if (this.isOnTop) {
          return;
        }

        this.moveBottom();
        this.addInterval(setInterval(() => this.moveBottom(), this.speed));
      },

      smoothDecreaseY() {
        if (this.isOnBottom) {
          this.y = this.minY;
          return;
        }

        this.moveTop();
        this.addInterval(setInterval(() => this.moveTop(), this.speed + 1));
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
        background-size: contain;
        background-image: url("../../img/mover-2.png");
        background-repeat: no-repeat;
    }
</style>
