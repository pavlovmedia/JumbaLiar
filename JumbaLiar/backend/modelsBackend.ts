import { modelCreate, modelFilters, modelPatch } from "./types";

export class modelsBackend {
  path: string = "/api/model";
  constructor() {}

  async getAll() {
    return await $fetch(this.path);
  }

  async getFiltered(filters: modelFilters) {
    // TODO
    return 0;
    // await $fetch(this.path);
  }

  async patch(data: modelPatch) {
    return await $fetch(this.path, {
      method: "PATCH",
      body: data,
    });
  }

  async post(data: modelCreate) {
    return await $fetch(this.path, {
      method: "POST",
      body: data,
    });
  }

  async postMany(data: modelCreate[]) {
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

  async put(data: modelCreate) {
    return await $fetch(this.path, {
      method: "PUT",
      body: data,
    });
  }

  async putMany(data: modelCreate[]) {
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
