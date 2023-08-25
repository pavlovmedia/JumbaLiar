<script setup lang="ts">
import { activeTab } from "~/app.vue";
</script>

<template>
  <Dashboard v-if="activeTab.tab === 'Dashboard'" />
  <Models v-if="activeTab.tab === 'Models'" />
  <Endpoints v-if="activeTab.tab === 'Endpoints'" />
  <NewEndpoint v-if="activeTab.tab === 'New Endpoint'" />
  <EditEndpoint v-if="activeTab.tab === 'Edit Endpoint'" />
</template>
