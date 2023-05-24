<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";
import TheWelcome from "./components/TheWelcome.vue";
import MainHeader from "./components/MainHeader.vue";
import SidebarHeader from "./components/SidebarHeader.vue";
</script>

<template>
  <div class="parentContainer">
    <div class="header">
      <SidebarHeader />
    </div>
    <div class="sidebarContainer">
      <Sidebar msg="You did it!" />
    </div>
  </div>

  <div class="parentContainer">
    <div class="header">
      <MainHeader />
      <!-- Need to pass in some var which is whatever tab is selected -->
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

.template {
  display: flex;
  height: 100%;
}
/*
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    /*margin: 0 2rem 0 0;*/ /*
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    background-color: green;
  }
}
*/
</style>
