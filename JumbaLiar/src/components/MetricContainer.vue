<script setup lang="ts">
import Metric from "./Metric.vue";
</script>

<template>
  <div class="metricContainer">
    <Metric title="Requests" value="1,543" />
    <Metric title="Most Service" value="/me" />
    <Metric title="Average Response" value="10ms" />
    <Metric title="Uptime" value="1d 10hrs" />
  </div>
</template>

<style scoped>
.metricContainer {
  display: flex;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 15px;
  gap: 10px;
}
</style>
