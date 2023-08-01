<script setup lang="ts">
import { reactive } from "vue";
</script>

<script lang="ts">
export const activeTab = reactive({
  tab: "Dashboard",
  setActiveTab(newTab: string) {
    this.tab = newTab;
  },
});

export const editEndpoint = reactive({
  path: "",
  method: "",
  behaviors: "",
  visible: false,
  setData(
    newPath?: string,
    newMethod?: string,
    newBehaviors?: string,
    newVisible?: boolean
  ) {
    if (newPath != undefined) this.path = newPath;
    if (newMethod != undefined) this.method = newMethod;
    if (newBehaviors != undefined) this.behaviors = newBehaviors;
    if (newVisible != undefined) this.visible = newVisible;
  },
  startCreate() {
    this.path = "";
    this.method = "";
    this.behaviors = "";
    this.visible = false;
    activeTab.setActiveTab("New Endpoint");
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
