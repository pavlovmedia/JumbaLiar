import { endpointCreate, endpointFilters, endpointPatch } from "./types";

export class endpointsBackend {
  path: string = "/api/endpoint";
  constructor() {}

  async getAll() {
    return await $fetch(this.path);
  }

  async getFiltered(filters: endpointFilters) {
    // TODO
    return 0;
    // await $fetch(this.path);
  }

  async patch(data: endpointPatch) {
    return await $fetch(this.path, {
      method: "PATCH",
      body: data,
    });
  }

  async post(data: endpointCreate) {
    return await $fetch(this.path, {
      method: "POST",
      body: {
        profileUsername: data.profileUsername,
        body: data.data,
      },
    });
  }

  async postMany(data: endpointCreate[]) {
    let target = this.path;
    let count = 0;
    data.forEach(async function (item) {
      count += await $fetch(target, {
        method: "POST",
        body: item,
      });
    });
    return count;
  }

  async put(data: endpointCreate) {
    return await $fetch(this.path, {
      method: "PUT",
      body: data,
    });
  }

  async putMany(data: endpointCreate[]) {
    let target = this.path;
    let count = 0;
    data.forEach(async function (item) {
      count += await $fetch(target, {
        method: "PUT",
        body: item,
      });
    });
    return count;
  }

  async delete(id: string) {
    return await $fetch(this.path, {
      method: "DELETE",
      body: { id: id },
    });
  }

  async deleteMany(ids: string[]) {
    let target = this.path;
    let count = 0;
    ids.forEach(async function (id) {
      count += await $fetch(target, {
        method: "DELETE",
        body: { id: id },
      });
    });
    return count;
  }
}
