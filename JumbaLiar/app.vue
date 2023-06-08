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
    <SidebarHeader />
    <div class="sidebarContainer">
      <Sidebar />
    </div>
  </div>
  <div class="columnContainer">
    <MainHeader />
    <div class="background">
      <MainContent />
    </div>
  </div>
</template>

<style scoped>
.sidebarContainer {
  box-sizing: border-box;
  background-color: var(--sidebar-light);
}
.background {
  background: url("./components/icons/ShrimpBackground.png");
  background-repeat: no-repeat;
  background-size: cover;
}
:deep(.p-card-body) {
  padding: 0px;
}
:deep(.p-card-title) {
  padding: 0px;
  padding-top: 5px;
  padding-inline: 15px;
  color: black;
}
:deep(.p-card-content) {
  padding: 0px;
  padding-inline: 15px;
  padding-bottom: 10px;
  font-size: 20px;
}
:deep(.p-paginator) {
  padding-bottom: 0;
}
.columnContainer {
  display: flex;
  display: grid;
  flex-grow: 1;
  gap: 0px;
  grid-template-rows: var(--header-height) auto;
}
</style>
