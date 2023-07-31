<script setup lang="ts">
import { activeTab } from "~/app.vue";
// const endpoints = [
//   {
//     method: "get",
//     path: "#298BB5",
//     behaviors: 1,
//     updatedOn: "5/10/2023",
//     updatedBy: "Justin White",
//     actions: [],
//   },
//   {
//     method: "get",
//     path: "#298BB5",
//     behaviors: 1,
//     updatedOn: "5/10/2023",
//     updatedBy: "Justin White",
//     actions: [],
//   },
//   {
//     method: "get",
//     path: "#298BB5",
//     behaviors: 1,
//     updatedOn: "5/10/2023",
//     updatedBy: "Justin White",
//     actions: [],
//   },
//   {
//     method: "get",
//     path: "#298BB5",
//     behaviors: 10,
//     updatedOn: "5/10/2023",
//     updatedBy: "Justin White",
//     actions: [],
//   },
// ];
const models = await $fetch("/api/model");
const endpoints = await $fetch("/api/endpoint");

function formatDate(date: string) {
  var day = date.charAt(8) == "0" ? date.charAt(9) : date.substring(8, 10);
  var month = date.charAt(5) == "0" ? date.charAt(6) : date.substring(5, 7);
  var year = date.substring(0, 4);
  return month + "/" + day + "/" + year;
}
</script>

<template>
  <div class="mainContainer">
    <Card class="listContainer">
      <template #title>Models</template>
      <template #content>
        <div class="dataViewContainer">
          <DataView :value="models" data-key="models" paginator :rows="8">
            <template #list="slotProps">
              <div>
                <i
                  class="pi pi-circle-fill dot"
                  :style="{ color: `${slotProps.data.type}` }"
                />
                {{ slotProps.data.label }}
              </div>
            </template>
          </DataView>
        </div>
      </template>
    </Card>
    <Card class="tableContainer">
      <template #title>
        <div class="tableHeader">
          <p class="titleText">Endpoint Count: {{ endpoints.length }}</p>
          <div>
            <Button
              icon="pi pi-plus"
              aria-label="Edit"
              class="button edit"
              @click="activeTab.setActiveTab('New Endpoint')"
            />
          </div>
        </div>
      </template>
      <template #content>
        <DataTable
          :value="endpoints"
          sortMode="multiple"
          removableSort
          paginator
          :rows="6"
        >
          <Column field="method" header="Method" sortable class="column">
            <template #body="slotProps">
              <Badge
                :value="slotProps.data.method"
                :class="slotProps.data.method"
              />
            </template>
          </Column>
          <Column field="path" header="Path" sortable class="column"> </Column>
          <Column
            field="behaviors"
            header="Behaviors"
            sortable
            class="column"
          ></Column>
          <Column field="updatedOn" header="Updated On" sortable class="column">
            <template #body="slotProps">
              {{ formatDate(slotProps.data.updatedOn) }}
            </template>
          </Column>
          <Column
            field="endpointUpdatedByProfile"
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
.tableHeader {
  display: flex;
  grid-template-rows: 1fr 1fr;
}
.listContainer {
  border-radius: var(--card-radius);
  background: white;
  max-height: fit-content;
  margin: var(--main-content-gap);
  flex-grow: 1;
}
.dataViewContainer {
  max-width: 400px;
}
.dot {
  padding-inline: 4px;
  padding-block: 9px;
}
.titleText {
  font-size: var(--header-font-size);
  color: black;
  text-align: left;
  margin: auto;
  font-weight: bold;
  flex-grow: 1;
}
.button {
  border: 0px;
  margin: 5px;
  height: 40px;
  width: 40px;
}
.edit {
  background-color: var(--sidebar-highlight);
}
.column {
  /* this doesn't do anything(?) */
  /* TODO: Figure out what was supposed to happen here, or just delete this */
  /* Maybe vertical lines between columns? */
}
.GET {
  background-color: var(--get-highlight);
}
.POST {
  background-color: var(--post-highlight);
}
.PUT {
  background-color: var(--put-highlight);
}
.PATCH {
  background-color: var(--patch-highlight);
}
.OPTIONS {
  background-color: var(--options-highlight);
}
.DELETE {
  background-color: var(--delete-highlight);
}

:deep(.p-card-title) {
  border-bottom-style: solid;
  border-bottom-width: var(--card-underline-width);
  border-color: var(--card-underline-color);
}
</style>
