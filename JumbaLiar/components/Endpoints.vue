<script setup lang="ts">
import { Endpoint } from "@prisma/client";
import { activeTab, editEndpoint } from "~/app.vue";
const models = await $fetch("/api/model");
const endpoints = ref([]);
const activeEndpoint = ref("");
update();

const deleteWarn = ref(false);

function formatDate(date: string) {
  var day = date.charAt(8) == "0" ? date.charAt(9) : date.substring(8, 10);
  var month = date.charAt(5) == "0" ? date.charAt(6) : date.substring(5, 7);
  var year = date.substring(0, 4);
  return month + "/" + day + "/" + year;
}

async function update() {
  endpoints.value = await $fetch("/api/endpoint");
}

function startEdit(endpoint: Endpoint) {
  editEndpoint.setData(
    endpoint.id,
    endpoint.path,
    endpoint.method,
    undefined,
    !endpoint.hidden
  );
  activeTab.setActiveTab("Edit Endpoint");
}

async function viewDelete(endpoint: Endpoint) {
  await editEndpoint.setData(
    endpoint.id,
    endpoint.path,
    endpoint.method,
    undefined,
    !endpoint.hidden
  );
  activeEndpoint.value = endpoint.path;
  deleteWarn.value = true;
}

async function deleteEndpoint() {
  await $fetch("/api/endpoint", {
    method: "DELETE",
    body: {
      id: editEndpoint.id,
    },
  });
  update();
  quit();
}

function deleteString() {
  return "Yes, delete the endpoint " + activeEndpoint.value;
}

function quit() {
  deleteWarn.value = false;
}
</script>

<template>
  <div class="mainContainer">
    <Dialog
      v-model:visible="deleteWarn"
      modal
      :show-header="false"
      content-style="padding: 0"
    >
      <Card class="deleteContainer">
        <template #header>
          <div class="tableHeader">
            <p class="titleText">Delete {{ activeEndpoint }}</p>
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
            Are you sure you want to delete the endpoint
            {{ editEndpoint.path }}?
          </p>
          <b> This action can not be undone<br /> </b>
          <div>
            <Button
              icon="pi pi-trash"
              :label="deleteString()"
              class="deleteButton orange"
              @click="deleteEndpoint()"
            />
            <!-- aria-label="delete" -->
          </div>
        </template>
      </Card>
    </Dialog>
    <div class="listDiv">
      <Card class="listContainer">
        <template #title>Models</template>
        <template #content>
          <div class="dataViewContainer">
            <DataView :value="models" data-key="models" paginator :rows="12">
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
    </div>
    <div class="tableDiv">
      <Card class="tableContainer">
        <template #title>
          <div class="tableHeader">
            <p class="titleText">Endpoint Count: {{ endpoints.length }}</p>
            <div>
              <Button
                icon="pi pi-plus"
                aria-label="Edit"
                class="button orange"
                @click="editEndpoint.startCreate()"
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
            <Column field="path" header="Path" sortable class="column">
            </Column>
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
            >
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
            <Column
              field="actions"
              header="Actions"
              class="column"
              style="min-width: 135px"
            >
              <template #body="slotProps">
                <Button
                  icon="pi pi-pencil"
                  aria-label="Edit"
                  class="button orange"
                  @click="startEdit(slotProps.data)"
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
    </div>
  </div>
</template>

<style scoped>
.mainContainer {
  display: flex;
  grid-template-columns: 1fr 1fr;
}
.tableDiv {
  flex-grow: 1;
}
.tableContainer {
  border-radius: var(--card-radius);
  background: white;
  max-height: fit-content;
  margin-top: var(--main-content-gap);
  margin-right: var(--main-content-gap);
}
.listDiv {
  flex-grow: 1;
  max-width: fit-content;
}
.listContainer {
  border-radius: var(--card-radius);
  background: white;
  max-height: fit-content;
  margin: var(--main-content-gap);
}
.deleteContainer {
  border-radius: var(--card-radius);
  background: white;
  max-height: fit-content;
  padding-inline: var(--main-content-gap);
  padding-top: var(--main-content-gap);
  flex-grow: 1;
}
.tableHeader {
  display: flex;
  grid-template-rows: 1fr 1fr;
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
.deleteButton {
  margin-top: 10px;
  border: 0px;
}
.grey {
  background-color: var(--sidebar-icon-grey);
}
.orange {
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
