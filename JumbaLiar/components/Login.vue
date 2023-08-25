<script setup lang="ts">
import { activeTab } from "~/app.vue";
const username = ref("");
const password = ref("");
const warn = ref(false);
const lastUsername = ref("");
const lastPassword = ref("");

async function login() {
  // TODO: check that username and password exist and match in DB
  // For now this is hardcoded so the username is BobbyTables and the password is asdfasdf1234

  // Commented this out for now, very annoying
  // if (username.value != "BobbyTables") {
  //   warn.value = true;
  //   lastUsername.value = username.value;
  //   lastPassword.value = password.value;
  //   return;
  // }
  // if (password.value != "asdfasdf1234") {
  //   warn.value = true;
  //   lastUsername.value = username.value;
  //   lastPassword.value = password.value;
  //   return;
  // }
  activeTab.setActiveTab("Dashboard");
}

function getWarn() {
  if (
    lastUsername.value == username.value &&
    lastPassword.value == password.value
  )
    return warn.value ? "p-invalid" : "";
}

function createAccount() {
  activeTab.setActiveTab("Create Account");
}
</script>

<template>
  <div class="mainContainer">
    <div class="loginContainer">
      <Card unstyled class="card">
        <template #header>
          <p class="title">Account Login</p>
        </template>
        <template #content>
          <div class="contentContainer">
            <img />
            <InputText
              :class="getWarn()"
              v-model="username"
              placeholder="Username"
            />
            <Password
              class="spacer"
              :class="getWarn()"
              :feedback="false"
              v-model="password"
              placeholder="Password"
              toggleMask
            />
            <small
              v-if="getWarn() == 'p-invalid'"
              class="warning"
              id="email-help"
            >
              Invalid username or password!
            </small>
            <Button
              class="button login doubleSpacer"
              label="Log In"
              @click="login"
            />
            <Divider align="center" type="solid">
              <b>or</b>
            </Divider>
            <Button
              class="button external spacer"
              label="Log in with Google"
              icon="pi pi-google"
            />
            <Button
              class="button external spacer"
              label="Log in with Facebook"
              icon="pi pi-facebook"
            />
          </div>
        </template>
      </Card>
      <div class="createContainer">
        <Button
          class="createButton"
          text
          label="Create an account"
          @click="createAccount"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
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
}
.createContainer {
  display: flex;
}
.spacer {
  margin-top: 20px;
}
.doubleSpacer {
  margin-block: 20px;
}
.createButton {
  color: white;
  margin: auto;
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
.warning {
  padding-left: 8px;
}
:deep(.p-divider) {
  margin: 0px;
}
:deep(.p-inputtext) {
  width: 315px;
  border-inline-width: 0px;
  border-top-width: 0px;
  border-bottom-width: 1px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-color: #5b5b5b;
}
</style>
