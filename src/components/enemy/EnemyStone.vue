<template>
    <div
        class="enemy enemy-stone"
        :style="{top: x + 'px', left: y + 'px', width: `${w}px`, height: `${h}px`, backgroundColor: this.theme}"
        :class="{hidden: !this.activated}"
    ></div>
</template>

<script>
  import enemy from "@/components/mixins/enemy";

  export default {
    name: "EnemyStone",

    mixins: [enemy],

    data() {
      return {
        type: 'stone',

        h: 15,
        w: 10,

        step: 5,
        speed: 30,
      }
    },

    props: {
      theme: {
        default: '#a26423'
      },
    },
  }
</script>

<style lang="less" scoped>
    .enemy {
        &.enemy-stone {
            position: absolute;
            border: 2px solid #cc473f;
        }

        &.hidden {
            display: none;
        }
    }
</style>
