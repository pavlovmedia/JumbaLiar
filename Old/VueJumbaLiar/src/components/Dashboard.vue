<script setup lang="ts">
import Metric from "./Metric.vue";
// import Chart from "primevue/chart";
import Timeline from "primevue/timeline";
import Card from "primevue/card";

// dummy inputs
import { ref } from "vue";

const events = [
  "Event A",
  "Event B",
  "Event C",
  "Event D",
  "Event E",
  "Event F",
  "Event G",
];
// [
//   { user: "John", action: "uploaded 5 assets", date: "May 9 2023" },
//   {
//     user: "Justin",
//     action: "updated 5 Organization endpoints",
//     date: "May 9 2023",
//   },
//   {
//     user: "John",
//     action: "udpated 1 Organization endpoint",
//     date: "May 9 2023",
//   },
//   {
//     user: "Justin",
//     action: "created 10 Organization endpoints",
//     date: "May 9 2023",
//   },
//   {
//     user: "Justin",
//     action: "created an Organization model",
//     date: "May 9 2023",
//   },
//   { user: "John", action: "created an account", date: "May 9 2023" },
//   { user: "Justin", action: "created and account", date: "May 9 2023" },
// ];
</script>

<script lang="ts"></script>

<template>
  <div class="metricContainer">
    <Metric title="Requests" value="1,543" />
    <Metric title="Most Service" value="/me" />
    <Metric title="Average Response" value="10ms" />
    <Metric title="Uptime" value="1d 10hrs" />
  </div>
  <div class="card">
    <Timeline :value="events">
      <template #content="slotProps">
        {{ slotProps.item.status }}
      </template>
    </Timeline>
  </div>
  <!-- <Timeline :value="events">
    <template #content="slotProps">
      {{ slotProps.item.date }}
    </template>
  </Timeline> -->
</template>

<style scoped>
.metricContainer {
  display: flex;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 15px;
  gap: 10px;
}

.card {
  height: 500px;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  background: white;
}

.p-timeline-event:nth-child(even) {
  flex-direction: row !important;
}
.p-timeline-event-content {
  text-align: left !important;
}

.p-timeline-event-opposite {
  flex: 0;
}

.p-card {
  margin-top: 1rem;
}
</style>
