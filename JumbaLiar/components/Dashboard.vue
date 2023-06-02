<script setup lang="ts">
import Metric from "./Metric.vue";
// import Chart from "primevue/chart";
import Timeline from "primevue/timeline";
import Card from "primevue/card";
import Chart from "primevue/chart";

// dummy inputs
import { ref, onMounted } from "vue";

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: documentStyle.getPropertyValue("--blue-500"),
        tension: 0.4,
      },
      {
        label: "Second Dataset",
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: documentStyle.getPropertyValue("--pink-500"),
        tension: 0.4,
      },
    ],
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary"
  );
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};

const events = [
  { event: "John uploaded 5 assets", date: "May 9 2023" },
  {
    event: "Justin updated 5 Organization endpoints",
    date: "May 9 2023",
  },
  {
    event: "John udpated 1 Organization endpoint",
    date: "May 9 2023",
  },
  {
    event: "Justin created 10 Organization endpoints",
    date: "May 9 2023",
  },
  {
    event: "Justin created an Organization model",
    date: "May 9 2023",
  },
  { event: "John created an account", date: "May 9 2023" },
  { event: "Justin created and account", date: "May 9 2023" },
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
    <Card class="chartCard" style="background-color: blueviolet">
      <Chart
        type="line"
        :data="chartData"
        :options="chartOptions"
        class="h-30rem"
      />
    </Card>

    <Card class="timelineCard">
      <template #title style="text-align: left">Latest Activity</template>
      <template #content>
        <!-- This is angry for no apparant reason -->
        <Timeline :value="events" align="left" style="p-timeline-left">
          <template #content="slotProps">
            <div class="activityEvent">
              {{ slotProps.item.event }}
              <br />
              <small>{{ slotProps.item.date }}</small>
            </div>
          </template>
        </Timeline>
      </template>
    </Card>
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

/* once these are done, they should be moved to main.css */
.timelineCard {
  border-radius: 10px;
  flex-direction: row;
  flex-grow: 1;
  max-width: 35%;
  background: white;
}
.chartCard {
  border-radius: 10px;
  flex-direction: row;
  flex-grow: 1;
  background: white;
}

:deep(.p-timeline-event-marker) {
  border: 3px solid var(--sidebar-highlight);
}

:deep(.p-card-title) {
  color: black;
}

:deep(.p-timeline-event-opposite) {
  display: none;
}
</style>
