<script setup lang="ts">
defineProps<{
  title: string;
  imagePath: string;
}>();
</script>

<template>
  <div class="container">
    <img id="icon" :src="imagePath" />
    <p>{{ title }}</p>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 66px;
}

img {
  /* object-fit: fill; */
  height: var(--sidebar-icon-height);
  width: var(--sidebar-icon-height);
  margin: auto;
  margin-left: 0rem;
}

p {
  font-size: 16px;
  color: white;
  margin: auto;
  margin-left: 15px;
  text-align: left;
  flex-grow: 1;
}
</style>
