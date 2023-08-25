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
    // if (res == -1) {
    //   return [];
    // }
    // return res;
  }

  async getFiltered(filters: modelFilters) {
    let all = await $fetch(this.path);
    // TODO: update this to actually use the filters
  }

  async patch(data: modelPatch) {
    return await $fetch(this.path, {
      method: "PATCH",
      body: {
        filters: {
          id: data.id,
        },
        update: data.data,
      },
    });
  }

  async post(data: modelCreate) {
    let a = await $fetch(this.path, {
      method: "POST",
      body: {
        createdBy: data.profileUsername,
        updatedBy: data.profileUsername,
        label: data.data.label,
        type: data.data.type,
        data: data.data.data,
      },
    });
    console.log(a);
    // return a;
    return -1;
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

  // async put(data: modelCreate) {
  //   return await $fetch(this.path, {
  //     method: "PUT",
  //     body: data,
  //   });
  // }

  // async putMany(data: modelCreate[]) {
  //   let target = this.path;
  //   let count = 0;
  //   data.forEach(async function (item) {
  //     count += await $fetch(target, {
  //       method: "PUT",
  //       body: item,
  //     });
  //   });
  //   return count;
  // }

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
