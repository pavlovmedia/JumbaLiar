<script setup lang="ts">
import { activeTab, editEndpoint } from "~/app.vue";
const path = ref(editEndpoint.path);
const method = ref(editEndpoint.method);
const visibility = ref(!editEndpoint.visible);
const behaviors = ref("");
const methodOptions = ref(["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]);

async function create() {
  console.log(
    await $fetch("/api/endpoint", {
      method: "POST",
      body: {
        path: path.value,
        method: method.value,
        visibility: visibility.value,
        // behaviors: behaviors.value,
        profile: "BobbyTables", // TODO: Un-hardcode this
      },
    })
  );
  quit();
}

function quit() {
  activeTab.setActiveTab("Endpoints");
}
</script>

<!-- TODO: Clean up styling, it's everywhere right now -->
<template>
  <div class="upperContainer">
    <div class="configContainer">
      <Card class="config card">
        <template #title>Configuration</template>
        <template #content>
          <div style="padding-bottom: 15px; flex-grow: 1">
            <InputText
              v-model="path"
              type="text"
              placeholder="/services/path"
              style="width: 100%"
            />
          </div>
          <div style="padding-bottom: 5px">
            <!-- TODO: See above todo -->
            <Dropdown
              v-model="method"
              :options="methodOptions"
              placeholder="Select a method"
              style="width: 100%"
            />
          </div>
        </template>
      </Card>
    </div>
    <div class="settingsHelpContainer">
      <Card class="settings card">
        <template #title>Settings</template>
        <template #content>
          <div style="padding-bottom: 5px">
            <!-- TODO: See above todo -->
            <ToggleButton
              class="toggleButton"
              type="button"
              v-model="visibility"
              on-label="Visibility: Visible"
              off-label="Visibility: Invisible"
              on-icon="pi pi-pencil"
              off-icon="pi pi-eye-slash"
              style="background-color: var(--sidebar-highlight); border: 0px"
            />
          </div>
          <!-- TODO: MOVE THIS AND THE OTHER BUTTON FORMATTING TO CSS FILE -->
        </template>
      </Card>
      <Card class="help card">
        <template #title>Help</template>
        <template #content>
          <ul>
            <li>Use path params with /:paramName</li>
          </ul>
        </template>
      </Card>
    </div>
  </div>
  <Card class="behaviors card">
    <template #title>Behaviors</template>
    <template #content>
      <div style="max-width: ">
        <Textarea
          v-model="behaviors"
          type="text"
          placeholder="Placeholder"
          class="behaviorsTextarea"
          style="width: 100%; height: 200px"
        />
      </div>
    </template>
  </Card>
  <div class="buttonContainer">
    <Card class="buttons card">
      <template #content>
        <Button
          class="grey button"
          label="Cancel"
          icon="pi pi-times"
          @click="quit"
        />
        <Button
          class="orange button"
          label="Create"
          icon="pi pi-check"
          style="margin-left: var(--main-content-gap)"
          @click="create()"
        />
      </template>
    </Card>
  </div>
</template>

<style scoped>
.card {
  border-radius: var(--card-radius);
  background: white;
  max-height: fit-content;
}
.upperContainer {
  display: flex;
  grid-template-columns: 1fr 1fr;
}
.configContainer {
  flex-grow: 1;
  max-width: 60%;
}
.settingsHelpContainer {
  flex-grow: 1;
  max-width: 40%;
}
/* .config should become `margin: var(...` instead of margin-right/bottom when not in dialog */
.config {
  margin: var(--main-content-gap);
  /* margin-right: var(--main-content-gap);
  margin-bottom: var(--main-content-gap); */
}
.settings {
  margin-block: var(--main-content-gap);
  margin-right: var(--main-content-gap);
}
.help {
  margin-right: var(--main-content-gap);
}
/* .behaviors should become `margin: var(...` instead of margin-top when not in dialog */
.behaviors {
  margin: var(--main-content-gap);
}
.behaviorsTextarea {
  width: 100%;
  height: 200px;
}
.buttonContainer {
  display: flex;
  flex-direction: row-reverse;
  /* background-color: red; */
}
.buttons {
  margin-inline: var(--main-content-gap);
  padding-top: var(--main-content-gap);
  padding-bottom: 5px;
}
.button {
  border: 0px;
}
.orange {
  background-color: var(--sidebar-highlight);
}
.grey {
  background-color: var(--sidebar-icon-grey);
}
:deep(.p-card-title) {
  border-bottom-style: solid;
  border-bottom-width: var(--card-underline-width);
  border-color: var(--card-underline-color);
}
</style>
