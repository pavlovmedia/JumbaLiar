import { modelCreate, modelFilters, modelPatch } from "./types";

export class modelsBackend {
  path: string = "/api/model";
  constructor() {
    // this.configDB();
  }

  // This function was used to set up most of the schema. It probably shouldn't be used in the future in favor of a DB dump
  async configDB() {
    try {
      let res = await $fetch("/api/util", { method: "post" });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    return await $fetch(this.path);
  }

  async getFiltered(filters: modelFilters) {
    let all = await $fetch(this.path);
    // TODO: update this to actually use the filters
    return all;
  }

  async patch(data: modelPatch) {
    return await $fetch(this.path, {
      method: "PATCH",
      body: {
        filters: {
          id: data.id,
        },
        update: {
          updatedBy: data.data.profileUsername,
          label: data.data.label,
          type: data.data.type,
          data: data.data.data,
        },
      },
    });
  }

  async post(data: modelCreate) {
    return await $fetch(this.path, {
      method: "POST",
      body: {
        createdBy: data.profileUsername,
        updatedBy: data.profileUsername,
        label: data.data.label,
        type: data.data.type,
        data: data.data.data,
      },
    });
  }

  async postMany(data: modelCreate[]) {
    let target = this.path;
    let res = 0;
    data.forEach(async function (item) {
      let a = await $fetch(target, {
        method: "POST",
        body: {
          createdBy: item.profileUsername,
          updatedBy: item.profileUsername,
          label: item.data.label,
          type: item.data.type,
          data: item.data.data,
        },
      });
      if (a == -1) res--;
    });
    return res;
  }

  async delete(id: string) {
    return await $fetch(this.path, {
      method: "DELETE",
      body: { id: id },
    });
  }

  async deleteMany(ids: string[]) {
    let target = this.path;
    let res = 0;
    ids.forEach(async function (id) {
      let a = await $fetch(target, {
        method: "DELETE",
        body: { id: id },
      });
      if (a == -1) res--;
    });
    return res;
  }
}
