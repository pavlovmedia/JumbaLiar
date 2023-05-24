<template>
  <div class="header">
    <p>
      <slot name="title"></slot>
      Placeholder
    </p>
    <div class="imageContainer">
      <img class="icon" src="./icons/ProfilePicture.jpeg" />
    </div>
  </div>
</template>

<style scoped>
.header {
  /* display: grid; */
  display: flex;
  /* grid-template-columns: 1fr 1fr; */
  background-color: white;
}

.imageContainer {
  margin: auto;
  margin-right: var(--header-pfp-margins);
  margin-bottom: var(--header-pfp-margins);
  margin-top: var(--header-pfp-margins);
}

.icon {
  object-fit: cover;
  height: var(--header-pfp-height);
  width: var(--header-pfp-height);
  border-radius: 50%;
}

p {
  font-size: var(--header-font-size);
  color: black;
  /* padding-left: 0.5rem; */
  text-align: left;
  margin: auto;
  margin-left: 0.75rem;
  font-weight: bold;
}
</style>
