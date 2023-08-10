<script setup lang="ts">
import { activeTab } from "~/app.vue";
const username = ref("");
const password = ref("");

function login() {
  activeTab.setActiveTab("Dashboard");
}
</script>

<template>
  <div class="background mainContainer">
    <div class="loginContainer">
      <Card unstyled class="card">
        <template #header>
          <p class="title">Account Login</p>
        </template>
        <template #content>
          <div class="contentContainer">
            <img />
            <InputText
              class="input"
              v-model="username"
              placeholder="Username"
            />
            <InputText
              class="input"
              v-model="password"
              placeholder="Password"
            />
            <Button class="button login" label="Log In" @click="login" />
            <Divider align="center" type="solid">
              <b>or</b>
            </Divider>
            <Button
              class="button external"
              label="Log in with Google"
              icon="pi pi-google"
            />
            <Button
              class="button external"
              label="Log in with Facebook"
              icon="pi pi-facebook"
            />
          </div>
        </template>
      </Card>
      <div class="createContainer">
        <Button class="createButton" text label="Create an account" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  background: url("./icons/LoginBackground.jpeg");
  background-repeat: no-repeat;
  background-size: auto;
}
.mainContainer {
  display: flex;
  width: 100%;
  height: 100%;
}
.loginContainer {
  margin: auto;
}
.card {
  border-radius: var(--card-radius);
  padding: var(--main-content-gap);
  gap: var(--main-content-gap);
  border-radius: var(--card-radius);
  background: white;
}
.title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: black;
}
.contentContainer {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.createContainer {
}
.input {
  width: 315px;
  border-inline-width: 0px;
  border-top-width: 0px;
  border-bottom-width: 1px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-color: #5b5b5b;
}
.createButton {
  color: white;
  justify-self: center;
}
.button {
  width: 315px;
  height: 45px;
}
.login {
  background-color: var(--sidebar-highlight);
  border: 0px;
}
.external {
  background-color: white;
  color: #181e28;
  border-width: 1px;
  border-color: black;
  border-radius: 4px;
}
:deep(.p-divider) {
  margin: 0px;
}
</style>
