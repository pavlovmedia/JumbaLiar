<script setup lang="ts">
const path = ref("");
const method = ref(null);
const visibility = ref(true);
const methodOptions = ref(["GET", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"]);
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
              :v-model="path"
              type="text"
              placeholder="/services/path"
              style="width: 100%"
            ></InputText>
          </div>
          <div style="padding-bottom: 5px">
            <!-- TODO: See above todo -->
            <Dropdown
              v-model="method"
              :options="methodOptions"
              placeholder="Select a method"
              style="width: 100%"
            />
            <!-- <SelectButton
              v-model="method"
              :options="methodOptions"
              aria-labelledby="basic"
            /> -->
            <!-- <InputText
              :v-model="method"
              type="text"
              placeholder="Method"
              style="width: 100%"
            ></InputText> -->
          </div>
        </template>
      </Card>
    </div>
    <div class="settingsHelpContainer">
      <Card class="settings card">
        <template #title>Settings</template>
        <template #content>
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
      <div>
        <Textarea
          v-model="path"
          type="text"
          placeholder="Placeholder"
          class="behaviorsTextarea"
          style="width: 100%; height: 200px"
        ></Textarea>
      </div>
      <!-- The missile knows where it is at all times. It knows this because it
      knows where it isn't. By subtracting where it is from where it isn't, or
      where it isn't from where it is (whichever is greater), it obtains a
      difference, or deviation. The guidance subsystem uses deviations to
      generate corrective commands to drive the missile from a position where it
      is to a position where it isn't, and arriving at a position where it
      wasn't, it now is. Consequently, the position where it is, is now the
      position that it wasn't, and it follows that the position that it was, is
      now the position that it isn't. In the event that the position that it is
      in is not the position that it wasn't, the system has acquired a
      variation, the variation being the difference between where the missile
      is, and where it wasn't. If variation is considered to be a significant
      factor, it too may be corrected by the GEA. However, the missile must also
      know where it was. The missile guidance computer scenario works as
      follows. Because a variation has modified some of the information the
      missile has obtained, it is not sure just where it is. However, it is sure
      where it isn't, within reason, and it knows where it was. It now subtracts
      where it should be from where it wasn't, or vice-versa, and by
      differentiating this from the algebraic sum of where it shouldn't be, and
      where it was, it is able to obtain the deviation and its variation, which
      is called error. <br /><br />
      Not sure what is supposed to go here so this copypasta will do. -->
    </template>
  </Card>
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
:deep(.p-card-title) {
  border-bottom-style: solid;
  border-bottom-width: var(--card-underline-width);
  border-color: var(--card-underline-color);
}
</style>
