<script setup lang="ts">
import { reactive } from "vue";
</script>

<script lang="ts">
export const activeTab = reactive({
  tab: "Login",
  setActiveTab(newTab: string) {
    this.tab = newTab;
  },
});

export const editEndpoint = reactive({
  id: "",
  path: "",
  method: "",
  behaviors: "",
  visible: false,
  setData(
    id: string,
    newPath?: string,
    newMethod?: string,
    newBehaviors?: string,
    newVisible?: boolean
  ) {
    this.id = id;
    if (newPath != undefined) this.path = newPath;
    if (newMethod != undefined) this.method = newMethod;
    if (newBehaviors != undefined) this.behaviors = newBehaviors;
    if (newVisible != undefined) this.visible = newVisible;
  },
  startCreate() {
    this.id = "";
    this.path = "";
    this.method = "";
    this.behaviors = "";
    this.visible = false;
    activeTab.setActiveTab("New Endpoint");
  },
});
</script>

<template>
  <div v-if="activeTab.tab === 'Login'" class="loginContainer">
    <Login style="flex-grow: 1" class="login background" />
  </div>
  <div v-if="activeTab.tab !== 'Login'" class="columnContainer">
    <SidebarHeader />
    <div class="sidebarContainer">
      <Sidebar />
    </div>
  </div>
  <div v-if="activeTab.tab !== 'Login'" class="columnContainer">
    <MainHeader />
    <div class="main background">
      <MainContent />
    </div>
  </div>
</template>

<style scoped>
.sidebarContainer {
  box-sizing: border-box;
  background-color: var(--sidebar-light);
}
.loginContainer {
  width: 100vw;
}
.background {
  background-repeat: no-repeat;
  background-size: cover;
}
.login {
  background-image: url("./components/icons/LoginBackground.jpeg");
}
.main {
  background-image: url("./components/icons/ShrimpBackground.png");
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
