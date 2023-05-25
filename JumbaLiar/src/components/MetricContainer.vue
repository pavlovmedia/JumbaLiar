<script setup lang="ts">
import Metric from "./Metric.vue";
</script>

<template>
  <div class="metricContainer">
    <Metric title="Requests" value="value1" />
    <Metric title="Most Service" value="value2" />
    <Metric title="Average Response" value="value3" />
    <Metric title="Uptime" value="value4" />
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
