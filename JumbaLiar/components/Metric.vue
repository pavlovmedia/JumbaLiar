<script setup lang="ts">
defineProps<{
  title: string;
  value: string;
}>();
</script>

<template>
  <Card style="height: fit-content">
    <template #title>{{ title }}</template>
    <template #content>{{ value }}</template>
  </Card>
</template>

<style scoped>
div {
  background-color: rgb(255, 255, 255);
  width: 100px;
  flex-grow: 1;
  border-radius: var(--card-radius);
}
</style>
