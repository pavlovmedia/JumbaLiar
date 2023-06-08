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
  /* display: grid; */
  display: flex;
  /* grid-template-columns: 1fr 1fr; */
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
  /* padding-left: 0.5rem; */
  text-align: left;
  margin: auto;
  margin-left: 15px;
  font-weight: bold;
}
</style>
