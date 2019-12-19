<template>
    <div class="enemies-wrap">
        <enemy-stone
            @moved-enemy-stone="movedStone"
        />
    </div>
</template>

<script>
  import EnemyStone from "@/components/enemy/EnemyStone";

  export default {
    name: "Enemy",

    components: {
      EnemyStone
    },

    methods: {
      movedStone(y) {
        this.$emit('moved-enemy-stone', y)
      },
    },
  }
</script>

<style scoped>
    .enemies-wrap {
        position: relative;
        top: 41px;
        right: 0px;
    }
</style>
