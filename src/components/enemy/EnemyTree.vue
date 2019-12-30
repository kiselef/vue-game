<template>
    <enemy-item
        class="enemy-tree"
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
    name: "EnemyTree",
    components: {
      EnemyItem
    },

    mixins: [enemy],

    data() {
      return {
        type: 'tree',

        h: 34,
        w: 29,

        step: 5,
        speed: 30,

        relative: 0,
      }
    },
  }
</script>

<style scoped>
    .enemy-tree {
        background-size: contain;
        background-image: url("../../img/tree.png");
        background-repeat: no-repeat;
    }
</style>
