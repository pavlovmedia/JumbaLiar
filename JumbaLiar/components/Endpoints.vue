<script setup lang="ts">
const endpoints = [
  {
    method: "get",
    path: "#298BB5",
    behaviors: 1,
    updatedOn: "5/10/2023",
    updatedBy: "Justin White",
    actions: [],
  },
  {
    method: "get",
    path: "#298BB5",
    behaviors: 1,
    updatedOn: "5/10/2023",
    updatedBy: "Justin White",
    actions: [],
  },
  {
    method: "get",
    path: "#298BB5",
    behaviors: 1,
    updatedOn: "5/10/2023",
    updatedBy: "Justin White",
    actions: [],
  },
  {
    method: "get",
    path: "#298BB5",
    behaviors: 10,
    updatedOn: "5/10/2023",
    updatedBy: "Justin White",
    actions: [],
  },
];
const models = [
  { color: "#298BB5", model: "MyAccountUser" },
  { color: "#298BB5", model: "Location" },
  { color: "#298BB5", model: "Organization" },
];
</script>

<template>
  <div class="mainContainer">
    <Card class="listContainer">
      <template #title>Models</template>
      <template #content>
        <DataView :value="models" data-key="models" paginator :rows="5">
          <template #list="slotProps">
            <div>
              <i
                class="pi pi-circle-fill dot"
                :style="{ color: `${slotProps.data.color}` }"
              ></i>
              {{ slotProps.data.model }}
            </div>
          </template>
        </DataView>
      </template>
    </Card>
    <Card class="tableContainer">
      <template #title>Endpoint Count: 1</template>
      <template #content>
        <DataTable
          :value="endpoints"
          sortMode="multiple"
          removableSort
          paginator
          :rows="6"
        >
          <Column field="method" header="Method" sortable class="column">
            <template #body>
              <Badge value="GET" class="getMethod" />
            </template>
          </Column>
          <Column field="path" header="Path" sortable class="column"> </Column>
          <Column
            field="behaviors"
            header="Behaviors"
            sortable
            class="column"
          ></Column>
          <Column
            field="updatedOn"
            header="Updated On"
            sortable
            class="column"
          ></Column>
          <Column
            field="updatedBy"
            header="Updated By"
            sortable
            class="column"
          ></Column>
          <Column field="actions" header="Actions" class="column">
            <template #body="slotProps"> </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.mainContainer {
  display: flex;
  grid-template-columns: 1fr 1fr;
}
.tableContainer {
  border-radius: var(--card-radius);
  background: white;
  max-height: fit-content;
  margin-top: var(--main-content-gap);
  margin-right: var(--main-content-gap);
  flex-grow: 1;
}
.listContainer {
  border-radius: var(--card-radius);
  background: white;
  max-height: fit-content;
  max-width: 400px;
  margin: var(--main-content-gap);
  flex-grow: 1;
}
.dot {
  padding-inline: 4px;
  padding-block: 9px;
}
:deep(.p-card-title) {
  border-bottom-style: solid;
  border-bottom-width: var(--card-underline-width);
  border-color: var(--card-underline-color);
}
.column {
  /* this doesn't do anything(?) */
}
.getMethod {
  background-color: #34a853;
}
</style>
