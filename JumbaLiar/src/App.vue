<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";
import TheWelcome from "./components/TheWelcome.vue";
import MainHeader from "./components/MainHeader.vue";
import SidebarHeader from "./components/SidebarHeader.vue";
</script>

<script lang="ts">
export default {
  data() {
    return {
      activeTab: "Dashboard",
    };
  },

  methods: {},

  // `mounted` is a lifecycle hook which we will explain later
  mounted() {
    // `this` refers to the component instance.
    console.log(this.activeTab);
  },
};
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
      <MainHeader :active="activeTab" />
    </div>
    <div class="background">
      <TheWelcome />
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
  filter: brightness(0.8);
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
