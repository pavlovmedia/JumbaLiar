<script setup lang="ts">
import { Model } from "@prisma/client";

const models = ref([]);
const edit = ref(false);
const create = ref(false);
const dataView = ref(false);
const deleteWarn = ref(false);
const label = ref("");
const type = ref("");
const data = ref("");
const id = ref("");
update();

function formatDate(date: string) {
  var day = date.charAt(8) == "0" ? date.charAt(9) : date.substring(8, 10);
  var month = date.charAt(5) == "0" ? date.charAt(6) : date.substring(5, 7);
  var year = date.substring(0, 4);
  return month + "/" + day + "/" + year;
}

async function update() {
  models.value = await $fetch("/api/model");
}

function startEdit(model: Model) {
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
        profile: "BobbyTables", // TODO: Un-hardcode this
      },
    });
  }
  edit.value = false;
  create.value = false;
  update();
}

function quit() {
  edit.value = false;
  create.value = false;
  deleteWarn.value = false;
}

function viewDelete(model: Model) {
  if (deleteWarn.value == true) {
    return;
  } else {
    label.value = model.label;
    type.value = model.type;
    data.value = model.data;
    id.value = model.id;
    deleteWarn.value = true;
  }
}

async function deleteModel() {
  console.log(
    await $fetch("/api/model", {
      method: "DELETE",
      body: {
        id: id.value,
      },
    })
  );
  update();
  quit();
}

function deleteString() {
  return "Yes, delete the model " + label.value;
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
          <Button
            icon="pi pi-plus"
            aria-label="newModel"
            class="button orange"
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
      <Dialog
        v-model:visible="deleteWarn"
        modal
        :show-header="false"
        content-style="padding: 0"
      >
        <Card class="deleteContainer">
          <template #header>
            <div class="tableHeader">
              <p class="titleText">Delete {{ label.valueOf() }}</p>
              <div>
                <Button
                  icon="pi pi-times"
                  aria-label="Quit"
                  class="button grey"
                  @click="quit()"
                />
              </div>
            </div>
          </template>
          <template #content>
            <p>
              Are you sure you want to delete the Model {{ label.valueOf() }}?
            </p>
            <b> This action can not be undone<br /> </b>
            <div>
              <Button
                icon="pi pi-trash"
                :label="deleteString()"
                class="deleteButton orange"
                @click="deleteModel()"
              />
              <!-- aria-label="delete" -->
            </div>
          </template>
        </Card>
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
              class="button orange"
              @click="startEdit(slotProps.data)"
            />
            <Button
              icon="pi pi-database"
              aria-label="ViewDB"
              class="button grey"
              @click="viewData(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              aria-label="Delete"
              class="button grey"
              @click="viewDelete(slotProps.data)"
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
.deleteContainer {
  border-radius: var(--card-radius);
  background: white;
  max-height: fit-content;
  padding-inline: var(--main-content-gap);
  padding-top: var(--main-content-gap);
  flex-grow: 1;
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
.deleteButton {
  margin-top: 10px;
  border: 0px;
}
.orange {
  background-color: #f37950;
}
.grey {
  background-color: var(--sidebar-icon-grey);
}
.titleText {
  font-size: var(--header-font-size);
  color: black;
  text-align: left;
  margin: auto;
  font-weight: bold;
  flex-grow: 1;
}
:deep(.p-card-title) {
  border-bottom-style: solid;
  border-bottom-width: var(--card-underline-width);
  border-color: var(--card-underline-color);
}
</style>
