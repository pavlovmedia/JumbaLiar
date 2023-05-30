<script setup lang="ts">
import SidebarSectionHeader from "./SidebarSectionHeader.vue";
import SidebarItem from "./SidebarItem.vue";
</script>

<template>
  <div class="list">
    <SidebarSectionHeader title="CONFIGURATION" />
    <SidebarItem title="Dashboard" icon="pi pi-home" />
    <SidebarItem title="Models" icon="pi pi-book" />
    <SidebarItem title="Proxies" icon="pi pi-link" />
    <SidebarItem title="Endpoints" icon="pi pi-globe" />
    <SidebarItem title="Uploads" icon="pi pi-file" />
    <SidebarItem title="Accounts" icon="pi pi-users" />
    <SidebarItem title="Settings" icon="pi pi-cog" />
    <SidebarSectionHeader title="LINKS" />
    <SidebarItem title="Swagger UI" icon="pi pi-book" />
    <SidebarItem title="Help" icon="pi pi-question-circle" />
  </div>
</template>

<style scoped>
.list {
  padding-block: 15px;
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
