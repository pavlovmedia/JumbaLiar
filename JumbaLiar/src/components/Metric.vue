<script setup lang="ts">
defineProps<{
  title: string;
  value: string;
}>();
</script>

<template>
  <div>
    <p class="title">{{ title }}</p>
    <p class="stat">{{ value }}</p>
  </div>
</template>

<style scoped>
.title {
  /* black, bold, 24pt*/
  color: black;
  font-weight: bold;
  font-size: 24px;
  padding-inline: 15px;
  margin: auto;
}

.stat {
  /* #000000 60%, 24pt, light */
  color: rgba(0, 0, 0, 60);
  font-weight: lighter;
  font-size: 24px;
  padding-inline: 15px;
  margin: auto;
}

div {
  height: 100px;
  background-color: rgb(255, 255, 255);
  flex-grow: 1;
  border-radius: 4px;
}
</style>
