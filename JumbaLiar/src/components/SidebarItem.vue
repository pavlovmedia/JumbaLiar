<script setup lang="ts">
defineProps<{
  title: string;
  imagePath: string;
}>();
</script>

<script lang="ts">
import { activeTab } from "@/App.vue";
export default {
  methods: {
    setActiveTab() {
      activeTab.tab = this.title;
    },
    isActive() {
      console.log(this.title, activeTab.tab, this.title == activeTab.tab);
      return activeTab.tab == this.title;
    },
    isNotActive() {
      console.log(this.title, activeTab.tab, this.title != activeTab.tab);
      return activeTab.tab != this.title;
    },
  },
};
</script>

<template>
  <div
    :class="{ unselected: isActive, selected: isNotActive }"
    v-on:click="setActiveTab"
  >
    <img id="icon" :src="imagePath" />
    <p>{{ title }}</p>
  </div>
</template>

<style scoped>
.unselected {
  display: flex;
  height: 66px;
  background-color: #17212f;
}

.selected {
  display: flex;
  height: 66px;
  background-color: blueviolet;
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
