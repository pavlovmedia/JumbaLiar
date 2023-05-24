<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div>
    <p>{{ title }}</p>
  </div>
</template>

<style scoped>
p {
  font-size: 14px;
  color: white;
  margin: auto;
  text-align: left;
}
</style>
