<script setup lang="ts">
const props = defineProps<{
  create: boolean;
  name: string;
  color: string;
  data: string;
}>();

const name = ref(props.name);
const color = ref(props.color);
const data = ref(props.data);
const title = props.create ? "Create Model" : "Update Model";
const saveButton = props.create ? "Create" : "Update";
</script>

<script lang="ts">
export default {
  methods: {
    save(name: string, color: string, data: string) {
      this.$emit("save", this.create, name, color.toUpperCase(), data);
    },
    quit() {
      this.$emit("quit");
    },
  },
};
</script>

<template>
  <Card class="card">
    <template #title> {{ title }} </template>
    <template #content>
      <div class="inputContainer">
        <InputText
          class="grow"
          v-model="name"
          placeholder="Model Name"
        ></InputText>
      </div>
      <div class="inputContainer">
        <InputMask
          class="grow"
          v-model="color"
          mask="#******"
          placeholder="Color"
        />
      </div>
      <div class="buttonContainer">
        <Button class="grey button buttonWidth grow center">
          <template #default>
            <i
              class="pi pi-file-import"
              style="font-size: x-large; padding-inline: 8px"
            />
            <p>Import Zod</p>
          </template>
        </Button>
        <Button class="grey button buttonWidth grow center">
          <template #default>
            <i
              class="pi pi-file-import"
              style="font-size: x-large; padding-inline: 8px"
            />
            <p>Import OpenAPI</p>
          </template>
        </Button>
        <Button class="grey button buttonWidth grow center">
          <template #default>
            <i
              class="pi pi-file-import"
              style="font-size: x-large; padding-inline: 8px"
            />
            <p>Import TypeScript</p>
          </template>
        </Button>
      </div>
      <div class="textBoxContainer">
        <Textarea
          rows="16"
          cols="30"
          v-model="data"
          placeholder="Data"
          style="flex-grow: 1"
        />
      </div>
      <!-- Change this to have a confirm and cancel button or smth -->
      <div class="buttonContainer alignLeft">
        <Button
          class="orange button"
          :label="saveButton"
          icon="pi pi-check"
          @click="save(name.valueOf(), color.valueOf(), data.valueOf())"
        ></Button>
        <Button
          class="grey button"
          label="Cancel"
          icon="pi pi-times"
          @click="quit"
        ></Button>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.card {
  flex-grow: 1;
  max-width: 700px;
  border-radius: var(--card-radius);
  gap: var(--main-content-gap);
  border-radius: var(--card-radius);
}
.inputContainer {
  display: flex;
  grid-template-rows: 1fr 1fr;
  padding-inline: 0px;
  padding-bottom: var(--main-content-gap);
}
.buttonContainer {
  display: flex;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--main-content-gap);
}
.textBoxContainer {
  display: flex;
  flex-grow: 1;
  padding-block: var(--main-content-gap);
}
.buttonWidth {
  width: 150px;
}
.orange {
  background-color: var(--sidebar-highlight);
}
.grey {
  background-color: var(--sidebar-icon-grey);
}
.button {
  border: 0px;
}
.grow {
  flex-grow: 1;
}
.alignLeft {
  flex-direction: row-reverse;
}
.center {
  justify-content: center;
}
:deep(.p-card-title) {
  border-bottom-style: solid;
  border-bottom-width: var(--card-underline-width);
  border-color: var(--card-underline-color);
}
</style>
