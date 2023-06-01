<script setup lang="ts">
import Metric from "./Metric.vue";
// import Chart from "primevue/chart";
import Timeline from "primevue/timeline";
import Card from "primevue/card";

// dummy inputs
import { ref } from "vue";

const events = [
  // "Event A",
  // "Event B",
  // "Event C",
  // "Event D",
  // "Event E",
  // "Event F",
  // "Event G",
  { user: "John", action: "uploaded 5 assets", date: "May 9 2023" },
  {
    user: "Justin",
    action: "updated 5 Organization endpoints",
    date: "May 9 2023",
  },
  {
    user: "John",
    action: "udpated 1 Organization endpoint",
    date: "May 9 2023",
  },
  {
    user: "Justin",
    action: "created 10 Organization endpoints",
    date: "May 9 2023",
  },
  {
    user: "Justin",
    action: "created an Organization model",
    date: "May 9 2023",
  },
  { user: "John", action: "created an account", date: "May 9 2023" },
  { user: "Justin", action: "created and account", date: "May 9 2023" },
];
</script>

<script lang="ts"></script>

<template>
  <div class="metricContainer">
    <Metric title="Requests" value="1,543" />
    <Metric title="Most Service" value="/me" />
    <Metric title="Average Response" value="10ms" />
    <Metric title="Uptime" value="1d 10hrs" />
  </div>
  <div class="visualsContainer">
    <div class="mainCard">
      <Card>
        <template #title style="text-align: left">Latest Activity</template>
        <template #content>
          <!-- This is angry for no apparant reason-->
          <Timeline :value="events" align="left" style="p-timeline-left">
            <template #content="slotProps">
              <!-- Fix the sizing issues first, then return to getting the timeline formatted correctly -->
              <!-- <Card>
                <template #title style="text-align: left">
                  <b>{{ slotProps.item.date }}</b>
                </template>
                <template #content style="text-align: left">
                  {{ slotProps.item.date }}
                </template>
              </Card> -->

              {{ slotProps.item.date }}
            </template>
          </Timeline>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.metricContainer {
  display: flex;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: var(--main-content-gap);
  gap: var(--main-content-gap);
}
.visualsContainer {
  display: flex;
  grid-template-columns: 1fr 1fr;
  padding-inline: var(--main-content-gap);
  gap: 10px;
}

.mainCard {
  /* margin-block: var(--main-content-gap); */
  /* height: 500px; */
  /* padding: 2rem; */
  border-radius: 10px;
  /* margin-bottom: 1rem; */
  flex-grow: 1;
  background: white;
}

.p-card {
  /* margin-top: 1rem; */
}

:deep(.p-timeline-event-opposite) {
  display: none;
}
</style>
