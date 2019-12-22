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
  import intervals from "@/lib/mixins/intervals"

  export default {
    name: "Mover",

    mixins: [intervals],

    data() {
      return {
        x: 0,
        y: 0,

        h: 60,
        w: 20,

        maxY: -80,
        minY: 0,

        step: 3,
        speed: 15,
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
    },

    watch: {
      isOnTop(value) {
        if (value) {
          this.clearTimeouts();
          this.smoothDecreaseY();
        }
      },

      isOnBottom(value) {
        if (value) {
          this.clearTimeouts();
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

        this.y -= this.step;
        this.addTimeout(setTimeout(() => {this.smoothIncreaseY()}, this.speed));
      },

      smoothDecreaseY() {
        if (this.isOnBottom) {
          this.y = this.minY;
          return;
        }

        this.y += this.step;
        this.addTimeout(setTimeout(() => {this.smoothDecreaseY()}, this.speed));
      },
    },
  }
</script>

<style lang="less" scoped>
    #mover {
        position: absolute;
        background-color: orangered;
        cursor: pointer;

        &.started:after {
            display: none;
        }

        &:after {
            content: 'Клац по мне';
            position: absolute;
            top: -15px;
            left: 25px;
            background-color: #dbfaff;
            width: max-content;
            padding: 0px 8px;
            border-radius: 10px 10px 10px 0px;
            cursor: none;
        }

        &:hover {
            &:after {
                content: 'Ага ;)';
            }
        }
    }
</style>
