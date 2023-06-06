<script setup lang="ts">
defineProps<{
  title: string;
  value: string;
}>();
</script>

<template>
  <Card>
    <template #title>{{ title }}</template>
    <template #content>{{ value }}</template>
  </Card>
  <!-- <div>
    <p class="title">{{ title }}</p>
    <p class="stat">{{ value }}</p>
  </div> -->
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
  color: rgba(0, 0, 0, 60);
  font-weight: lighter;
  font-size: 24px;
  padding-inline: 15px;
  margin: auto;
}

:deep(.p-card-body) {
  padding: 0px;
}
:deep(.p-card-title) {
  padding: 0px;
}
:deep(.p-card-content) {
  padding: 0px;
}

div {
  background-color: rgb(255, 255, 255);
  width: 100px;
  flex-grow: 1;
  border-radius: 10px;
}
</style>
