<template>
    <enemy-item
        :class="`enemy-bird ${this.wingUp ? 'wing-up' : ''}`"
        :x="x"
        :y="y"
        :w="w"
        :h="h"
        :activated="activated"
    />
</template>

<script>
  import enemy from "@/components/mixins/enemy";
  import EnemyItem from "@/components/enemy/EnemyItem";

  export default {
    name: "EnemyBird",
    components: {
      EnemyItem
    },

    mixins: [enemy],

    data() {
      return {
        type: 'bird',

        h: 20,
        w: 50,

        y: 80,

        wingUp: false,
      }
    },

    watch: {
      activated(value) {
        const r = Math.random();
        this.y = Math.round(r) > 0 ? this.y : 10;

        if (value) {
          this.addInterval(setInterval(() => this.wingUp = !this.wingUp, 250));
        } else {
          this.clearIntervals();
        }
      },
    },
  }
</script>

<style lang="less" scoped>
    .enemy-bird {
        background-size: cover;
        background-image: url("../../img/bird-parts.png");
        background-repeat: no-repeat;
        background-position-y: bottom;
        &.wing-up {
            background-position-y: top;
        }
    }
</style>
