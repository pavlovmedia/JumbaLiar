<script setup lang="ts">
import { activeTab } from "~/app.vue";
</script>

<template>
  <div class="header">
    <p>
      <slot name="title"></slot>
      {{ activeTab.tab }}
    </p>
    <img class="icon" src="./icons/ProfilePicture.jpeg" />
  </div>
</template>

<style scoped>
.header {
  display: flex;
  background-color: white;
}

.icon {
  object-fit: cover;
  height: var(--header-pfp-height);
  width: var(--header-pfp-height);
  border-radius: 50%;
  margin: auto;
  margin-right: var(--header-pfp-margins);
  margin-bottom: var(--header-pfp-margins);
  margin-top: var(--header-pfp-margins);
}

p {
  font-size: var(--header-font-size);
  color: black;
  text-align: left;
  margin: auto;
  margin-left: 15px;
  font-weight: bold;
}
</style>
