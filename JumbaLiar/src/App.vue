<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";
import MainContent from "./components/MainContent.vue";
import MainHeader from "./components/MainHeader.vue";
import SidebarHeader from "./components/SidebarHeader.vue";
import { reactive } from "vue";
</script>

<script lang="ts">
export const activeTab = reactive({
  tab: "Dashboard",
});
</script>

<template>
  <div class="parentContainer">
    <div class="header">
      <SidebarHeader />
    </div>
    <div class="sidebarContainer">
      <Sidebar />
    </div>
  </div>

  <div class="parentContainer">
    <div class="header">
      <MainHeader />
    </div>
    <div class="background">
      <MainContent />
    </div>
  </div>
</template>

<style scoped>
.sidebarContainer {
  box-sizing: border-box;
  background-color: #17212f;
}

.header {
  height: 100%;
}

.background {
  flex-grow: 1;
  background: url("./components/icons/ShrimpBackground.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.parentContainer {
  display: flex;
  display: grid;
  gap: 0px;
  grid-template-rows: var(--header-height) auto;
}
</style>
