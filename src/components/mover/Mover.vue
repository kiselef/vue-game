<template>
    <div
        id="mover"
        @click="down()"
        :style="{top: x + 'px', left: y + 'px', width: `${w}px`, height: `${h}px`}" :class="{started: this.started}">
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

        maxX: -80,
        minX: 0,
      }
    },

    computed: {
      started() {
        return store.started;
      },

      isOnTop() {
        return this.x <= this.maxX;
      },

      isOnBottom() {
        return this.x >= this.minX;
      },

      inJumping() {
        return this.x !== 0;
      },
    },

    watch: {
      isOnTop(value) {
        if (value) {
          this.clearTimeouts();
          this.smoothDecreaseX();
        }
      },
    },

    methods: {
      down() {
        if (this.inJumping) {
          return;
        }
        this.$emit('start');
        this.smoothIncreaseX();
      },

      smoothIncreaseX() {
        if (this.isOnTop) {
          return;
        }

        this.x -= 5;
        this.addTimeout(setTimeout(() => {this.smoothIncreaseX()}, 25));
      },

      smoothDecreaseX() {
        if (this.isOnBottom) {
          this.x = this.minX;
          return;
        }

        this.x += 5;
        setTimeout(() => {this.smoothDecreaseX()}, 30);
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
