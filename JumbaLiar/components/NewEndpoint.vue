<script setup>
import Card from "primevue/card";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
</script>

<template>
  <div class="horizontalColumns">
    <Card class="container">
      <template #title>Configuration</template>
      <template #content>
        <div style="padding-bottom: 15px" ; flex-grow: 1;>
          <!-- <InputText
            v-model="path"
            type="text"
            placeholder="services"
            style="width: 100%"
          ></InputText> -->
        </div>
        <div>
          <InputText
            v-model="method"
            type="text"
            placeholder="Method"
            style="width: 100%"
          ></InputText>
        </div>
      </template>
    </Card>
    <div style="flex-grow: 1; max-width: 35%">
      <Card class="container">
        <template #title>Settings</template>
        <template #content>
          <Button
            type="button"
            label="Visibility: Visible"
            icon="pi pi-pencil"
            style="background-color: #f37950; border: 0px"
          ></Button>
          <!-- MOVE THIS AND THE OTHER BUTTON FORMATTING TO CSS FILE -->
        </template>
      </Card>
      <Card class="container">
        <template #title>Help</template>
        <template #content>
          <ul>
            <li>Use path params with /:paramName</li>
          </ul>
        </template>
      </Card>
    </div>
  </div>
  <Card class="container">
    <template #title>Behaviors</template>
    <template #content
      >The missile knows where it is at all times. It knows this because it
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
      Not sure what is supposed to go here so this copypasta will do.
    </template>
  </Card>
</template>

<style scoped>
.container {
  border-radius: var(--card-radius);
  background: white;
  max-height: fit-content;
  margin: var(--main-content-gap);
  flex-grow: 1;
}
.horizontalColumns {
  display: flex;
  grid-template-columns: 1fr 1fr;
}
</style>
