<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Card from "primevue/card";
import Button from "primevue/button";

const endpoints = [
  {
    name: "Organization",
    color: "#298BB5",
    usages: 1,
    updatedOn: "5/10/2023",
    updatedBy: "Justin White",
    actions: ["edit"],
  },
  {
    name: "MyAccountUser",
    color: "#298BB5",
    usages: 0,
    updatedOn: "5/10/2023",
    updatedBy: "Justin White",
    actions: ["edit"],
  },
  {
    name: "Location",
    color: "#298BB5",
    usages: 5,
    updatedOn: "5/10/2023",
    updatedBy: "Justin White",
    actions: ["edit"],
  },
  {
    name: "PostalAddress",
    color: "#298BB5",
    usages: 10,
    updatedOn: "5/10/2023",
    updatedBy: "Justin White",
    actions: ["edit"],
  },
];
</script>

<template>
  <Card class="tableContainer">
    <template #title>Model Count: 1</template>
    <template #content>
      <DataTable
        :value="endpoints"
        paginator
        showGridlines
        :rows="6"
        style="width: 100% !important"
      >
        <Column field="name" header="Name" class="column"></Column>
        <Column field="color" header="Color" class="column">
          <template #body="slotProps">
            <i
              class="pi pi-circle-fill"
              :style="{ color: `${slotProps.data.color}` }"
            ></i>
            {{ slotProps.data.color }}
          </template>
        </Column>
        <Column field="usages" header="Usages" class="column"></Column>
        <Column field="updatedOn" header="Updated On" class="column"></Column>
        <Column field="updatedBy" header="Updated By" class="column"></Column>
        <Column field="actions" header="Actions" class="column">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" aria-label="Edit" class="button edit" />
            <Button
              icon="pi pi-database"
              aria-label="Edit"
              class="button database"
            />
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>

<style scoped>
.tableContainer {
  border-radius: var(--card-radius);
  background: white;
  max-height: fit-content;
  margin: var(--main-content-gap);
  min-width: fit-content;
}
.column {
  max-width: 15%;
  flex-grow: 1;
}
.button {
  border: 0px;
  margin: 5px;
  height: 40px;
  width: 40px;
}
.edit {
  background-color: #f37950;
}
.database {
  background-color: #787878;
}
</style>
