<template>
    <div
        :style="{width: `${this.w}px`, height: `${this.h}px`, left: `${this.x}px`, bottom: `${this.y}px`}"
        :class="{started: started}"
    ></div>
</template>

<script>
  import intervals from "@/components/mixins/intervals";

  export default {
    name: "Bullet",

    data() {
      return {
        w: 8,
        h: 8,
        x: 35,
        y: 20,
        step: 5,
        speed: 20,
      }
    },

    mixins: [intervals],

    props: {
      started: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      y2() {
        return this.y + this.h;
      },

      x2() {
        return this.x + this.w;
      },
    },

    watch: {
      started(value) {
        if (value) {
          this.addInterval(setInterval(() => { this.x += this.step }, this.speed))
        }
      },

      x() {
        this.$emit('moved', this);
      },
    },
  }
</script>

<style lang="less" scoped>
    div {
        background: darkolivegreen;
        position: absolute;
        &.started {
            -webkit-animation:spin 0.4s linear infinite;
            -moz-animation:spin 0.4s linear infinite;
            animation:spin 0.4s linear infinite;
        }
    }

    @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
    @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
    @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
</style>
