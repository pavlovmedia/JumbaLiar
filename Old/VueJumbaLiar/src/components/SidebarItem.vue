<script setup lang="ts">
defineProps<{
  title: string;
  icon: string;
}>();
</script>

<script lang="ts">
import { activeTab } from "@/App.vue";
import "primeicons/primeicons.css";
export default {
  methods: {},
  data() {
    return {
      active: activeTab.tab,
    };
  },
  computed: {
    divClass() {
      return {
        unselected: activeTab.tab != this.title,
        selected: activeTab.tab == this.title,
      };
    },
    iconHighlighted() {
      return activeTab.tab == this.title
        ? "--sidebar-highlight"
        : "--sidebar-icon-grey";
    },
  },
};
</script>

<template>
  <div :class="divClass" v-on:click="activeTab.setActiveTab(title)">
    <i :class="icon" :style="{ color: `var(${iconHighlighted})` }"></i>
    <p>{{ title }}</p>
  </div>
</template>

<style scoped>
.unselected {
  display: flex;
  height: 66px;
  background-color: var(--sidebar-light);
  margin-left: 15px;
}

.selected {
  display: flex;
  height: 66px;
  background-color: var(--sidebar-dark);
  border-inline: solid;
  border-left-width: 5px;
  border-inline-start-color: var(--sidebar-highlight);
  padding-left: 10px;
}

.selectedIcon {
  color: var(--sidebar-highlight);
}

i {
  /* object-fit: fill; */
  height: var(--sidebar-icon-height);
  width: var(--sidebar-icon-height);
  font-size: var(--sidebar-icon-height);
  color: var(--sidebar-icon-grey);
  margin: auto;
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
