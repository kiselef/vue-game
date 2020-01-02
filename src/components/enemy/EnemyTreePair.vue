<template>
    <enemy-item
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
    name: "EnemyTreePair",
    components: {EnemyItem},
    mixins: [enemy],

    data() {
      return {
        type: 'treePair',

        h: 30,
        w: 30,
      }
    },
  }
</script>

<style lang="less" >
    .enemy {
        background-size: contain;
        background-image: url("../../img/tree-2.png");
        background-repeat: no-repeat;
    }
</style>
