<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Card from "primevue/card";
import Button from "primevue/button";
import { Model } from "@prisma/client";

const models = await $fetch("/api/model");

const edit = ref(false);
const create = ref(false);
const dataView = ref(false);
const label = ref("");
const type = ref("");
const data = ref("");
const id = ref("");

function formatDate(date: string) {
  var day = date.charAt(8) == "0" ? date.charAt(9) : date.substring(8, 10);
  var month = date.charAt(5) == "0" ? date.charAt(6) : date.substring(5, 7);
  var year = date.substring(0, 4);
  return month + "/" + day + "/" + year;
}

function startEdit(model: Model) {
  console.log("click");
  if (edit.value == true) {
    return;
  } else {
    label.value = model.label;
    type.value = model.type;
    data.value = model.data;
    id.value = model.id;
    edit.value = true;
  }
}

function startCreate() {
  console.log("click");
  if (create.value == true) {
    return;
  } else {
    label.value = "";
    type.value = "";
    data.value = "";
    id.value = "";
    create.value = true;
  }
}

function viewData(model: Model) {
  console.log("Data click");
  if (dataView.value == true) {
    return;
  } else {
    label.value = model.label;
    type.value = model.type;
    data.value = model.data == "" ? "Model has no data!" : model.data;
    id.value = model.id;
    dataView.value = true;
  }
}

async function save(
  created: boolean,
  newLabel: string,
  newType: string,
  newData: string
) {
  if (created) {
    await $fetch("/api/model", {
      method: "POST",
      body: {
        label: newLabel,
        type: newType,
        data: newData,
        profile: "BobbyTables", // TODO: Un-hardcode this
      },
    });
  } else if (
    !(newLabel == label.value && newType == type.value && newData == data.value)
  ) {
    await $fetch("/api/model", {
      method: "PATCH",
      body: {
        id: id.value,
        label: newLabel,
        type: newType,
        data: newData,
      },
    });
  }
  edit.value = false;
  create.value = false;
}

function quit() {
  edit.value = false;
  create.value = false;
}

// Demo function
// async function testPost() {
//   console.log(
//     await $fetch("/api/model", {
//       // TODO: Un-hardcode this
//       method: "POST",
//       body: {
//         label: "TestingLabel",
//         // type: "",
//         // data: "",
//         profile: "BobbyTables", // TODO: Un-hardcode this
//       },
//     })
//   );
// }
</script>

<template>
  <Card class="tableContainer">
    <template #title>
      <div class="tableHeader">
        <p class="titleText">Model Count: {{ models.length }}</p>
        <div>
          <!--class="buttonContainer"-->
          <Button
            icon="pi pi-plus"
            aria-label="Edit"
            class="button edit"
            @click="startCreate"
          />
        </div>
      </div>
    </template>
    <template #content>
      <Dialog
        v-model:visible="edit"
        modal
        :show-header="false"
        content-style="padding: 0;"
      >
        <!-- style="{border-radius: `${var(--card-radius)}}" -->
        <EditModel
          :create="false"
          :name="label.valueOf()"
          :color="type.valueOf()"
          :data="data.valueOf()"
          @save="save"
          @quit="quit"
        />
      </Dialog>
      <Dialog
        v-model:visible="create"
        modal
        :show-header="false"
        content-style="padding: 0;"
      >
        <!-- style="{border-radius: `${var(--card-radius)}}" -->
        <EditModel
          :create="true"
          name=""
          color=""
          data=""
          @save="save"
          @quit="quit"
        />
      </Dialog>
      <Dialog v-model:visible="dataView" modal content-style="padding: 0;">
        <!-- :show-header="false"
          style="{border-radius: `${var(--card-radius)}}" -->
        <template #header>
          {{ "Not implemented yet :)  " }}
          <!-- <p class="titleText">Data for {{ label }}</p> -->
        </template>
        <!-- <DataView :name="label.valueOf()" :data="data.valueOf()"> </DataView> -->
      </Dialog>
      <DataTable
        :value="models"
        paginator
        showGridlines
        :rows="6"
        sortMode="multiple"
        removableSort
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
              @click="viewData(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>

<style scoped>
.dataCard {
  padding-inline: var(--main-content-gap);
  gap: var(--main-content-gap);
  width: 100%;
  background: white;
  max-height: fit-content;
}
.tableContainer {
  border-radius: var(--card-radius);
  background: white;
  max-height: fit-content;
  margin: var(--main-content-gap);
  min-width: fit-content;
}
.tableHeader {
  display: flex;
  grid-template-rows: 1fr 1fr;
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
.titleText {
  font-size: var(--header-font-size);
  color: black;
  text-align: left;
  margin: auto;
  /* display: table-cell;
  vertical-align: middle; */
  font-weight: bold;
  flex-grow: 1;
}
:deep(.p-card-title) {
  border-bottom-style: solid;
  border-bottom-width: var(--card-underline-width);
  border-color: var(--card-underline-color);
}
</style>
