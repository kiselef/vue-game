<template>
    <enemy-item
        class="enemy-stone"
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
    name: "EnemyStone",
    components: {EnemyItem},
    mixins: [enemy],

    data() {
      return {
        type: 'stone',

        h: 30,
        w: 30,

        step: 5,
        speed: 30,
      }
    },
  }
</script>

<style lang="less" >
    .enemy-stone {
        background-size: contain;
        background-image: url("../../img/tree-2.png");
        background-repeat: no-repeat;
    }
</style>
