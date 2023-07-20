<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Card from "primevue/card";
import Button from "primevue/button";
import { Model } from "@prisma/client";

/////////////////////////// ADDED STUFF

// If possible find something else, this really likes to break
// this breaks stuff for now, error: No PrimeVue Dialog provided
// import { useDialog } from "primevue/usedialog";
// const ModelEditor = defineAsyncComponent(
//   () => import("./components/EditModel.vue")
// );
// const dialog = useDialog();

const edit = ref(false);
const label = ref("");
const type = ref("");
const data = ref("");

function startEdit(model: Model) {
  console.log("click");
  if (edit.value == true) {
    return;
  } else {
    label.value = model.label;
    type.value = model.type;
    data.value = model.data;
    edit.value = true;
  }
}

/////////////////////////// END ADDED STUFF

const models = await $fetch("/api/model");

// Demo function
async function testPost() {
  console.log(
    await $fetch("/api/model", {
      // TODO: Un-hardcode this
      method: "POST",
      body: {
        label: "TestingLabel",
        // type: "",
        // data: "",
        profile: "BobbyTables", // TODO: Un-hardcode this
      },
    })
  );
}

function formatDate(date: string) {
  var day = date.charAt(8) == "0" ? date.charAt(9) : date.substring(8, 10);
  var month = date.charAt(5) == "0" ? date.charAt(6) : date.substring(5, 7);
  var year = date.substring(0, 4);
  return month + "/" + day + "/" + year;
}

// const edit = (model: Object) => {
//   const dialogRef = dialog.open(ModelEditor, {
//     props: {
//       contentProps: {
//         name: model.label,
//         color: model.type,
//         data: model.data,
//       },
//     },
//   });
// };
</script>

<template>
  <Card class="tableContainer">
    <template #title>
      Model Count: 1
      <!-- TEST BUTTON -->
      <Button icon="pi pi-cog" aria-label="Edit" class="button edit" />
    </template>
    <template #content>
      <Dialog
        v-model:visible="edit"
        modal
        :show-header="false"
        content-style="padding: 0;"
        style="{border-radius: `${var(--card-radius)}}"
      >
        <EditModel
          :name="label.valueOf()"
          :color="type.valueOf()"
          :data="data.valueOf()"
        />
      </Dialog>
      <DataTable
        :value="models"
        paginator
        showGridlines
        :rows="6"
        sortMode="multiple"
        removableSort
        data-key="id"
      >
        <Column field="label" header="Name" sortable />
        <Column field="type" header="Color" sortable>
          <template #body="slotProps">
            <i
              class="pi pi-circle-fill"
              :style="{ color: `${slotProps.data.type}` }"
            />
            {{ slotProps.data.type }}
          </template>
        </Column>
        <Column field="usages" header="Usages" sortable />
        <Column field="updatedOn" header="Updated On" sortable>
          <template #body="slotProps">
            {{ formatDate(slotProps.data.updatedOn) }}
          </template>
        </Column>
        <Column field="profileUpdatedByUsername" header="Updated By" sortable />
        <Column field="data" header="Actions">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              aria-label="Edit"
              class="button edit"
              @click="startEdit(slotProps.data)"
            />
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
