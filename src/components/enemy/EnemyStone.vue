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

        h: 5,
        w: 10,
      }
    },
  }
</script>

<style lang="less" >
    .enemy-stone {
        background: black;
    }
</style>
