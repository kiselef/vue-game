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
    components: {EnemyItem},
    mixins: [enemy],

    data() {
      return {
        type: 'tree',

        h: 25,
        w: 5,

        step: 5,
        speed: 30,
      }
    },
  }
</script>

<style scoped>

</style>
