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
        sortMode="multiple"
      >
        <Column field="name" header="Name" sortable />
        <Column field="color" header="Color" sortable>
          <template #body="slotProps">
            <i
              class="pi pi-circle-fill"
              :style="{ color: `${slotProps.data.color}` }"
            />
            {{ slotProps.data.color }}
          </template>
        </Column>
        <Column field="usages" header="Usages" sortable />
        <Column field="updatedOn" header="Updated On" sortable />
        <Column field="updatedBy" header="Updated By" sortable />
        <Column field="actions" header="Actions">
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
:deep(.p-card-title) {
  border-bottom-style: solid;
  border-bottom-width: var(--card-underline-width);
  border-color: var(--card-underline-color);
}
</style>
