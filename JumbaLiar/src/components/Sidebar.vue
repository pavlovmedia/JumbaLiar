<script setup lang="ts">
import SidebarSectionHeader from "./SidebarSectionHeader.vue";
import SidebarItem from "./SidebarItem.vue";
defineProps<{
  msg: string;
}>();
</script>

<template>
  <div class="list">
    <SidebarSectionHeader title="CONFIGURATION" />
    <SidebarItem
      title="Dashboard"
      imagePath="./src/components/icons/SingleShrimp.png"
    />
    <SidebarItem
      title="Models"
      imagePath="./src/components/icons/SingleShrimp.png"
    />
    <SidebarItem
      title="Proxies"
      imagePath="./src/components/icons/SingleShrimp.png"
    />
    <SidebarItem
      title="Endpoints"
      imagePath="./src/components/icons/SingleShrimp.png"
    />
    <SidebarItem
      title="Uploads"
      imagePath="./src/components/icons/SingleShrimp.png"
    />
    <SidebarItem
      title="Accounts"
      imagePath="./src/components/icons/SingleShrimp.png"
    />
    <SidebarItem
      title="Settings"
      imagePath="./src/components/icons/SingleShrimp.png"
    />
    <SidebarSectionHeader title="LINKS" />
    <SidebarItem
      title="Swagger UI"
      imagePath="./src/components/icons/SingleShrimp.png"
    />
    <SidebarItem
      title="Help"
      imagePath="./src/components/icons/SingleShrimp.png"
    />
  </div>
</template>

<style scoped>
.list {
  padding: 15px;
  gap: 15px;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.list h1,
.list h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .list h1,
  .list h3 {
    text-align: left;
  }
}
</style>
