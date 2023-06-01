<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";
import MainContent from "./components/MainContent.vue";
import MainHeader from "./components/MainHeader.vue";
import SidebarHeader from "./components/SidebarHeader.vue";
import { reactive } from "vue";
import Dashboard from "./components/Dashboard.vue";
</script>

<script lang="ts">
export const activeTab = reactive({
  tab: "Dashboard",
  setActiveTab(newTab: string) {
    this.tab = newTab;
  },
});
</script>

<template>
  <div class="columnContainer">
    <div class="header">
      <SidebarHeader />
    </div>
    <div class="sidebarContainer">
      <Sidebar />
    </div>
  </div>

  <div class="columnContainer">
    <div class="header">
      <MainHeader />
    </div>
    <div class="background">
      <!-- <Dashboard /> -->
      <MainContent />
    </div>
  </div>
</template>

<style scoped>
.sidebarContainer {
  box-sizing: border-box;
  background-color: var(--sidebar-light);
}

.header {
  /* height: 100%; */
}

.background {
  background: url("./components/icons/ShrimpBackground.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.columnContainer {
  display: flex;
  display: grid;
  flex-grow: 1;
  gap: 0px;
  grid-template-rows: var(--header-height) auto;
}
</style>
