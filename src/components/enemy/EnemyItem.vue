<template>
    <div
        class="enemy"
        :style="{bottom: `${y}px`, left: `${x}px`, width: `${w}px`, height: `${h}px`}"
        :class="{hidden: !this.activated}"
    ></div>
</template>

<script>
  export default {
    name: "EnemyItem",

    props: ['x', 'y', 'w', 'h', 'activated'],
  }
</script>

<style scoped>

</style>
