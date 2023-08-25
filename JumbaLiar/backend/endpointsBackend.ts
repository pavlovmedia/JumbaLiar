import { endpointCreate, endpointFilters, endpointPatch } from "./types";

export class endpointsBackend {
  path: string = "/api/endpoint";
  constructor() {}

  async getAll() {
    return await $fetch(this.path);
  }

  async getFiltered(filters: endpointFilters) {
    let all = await $fetch(this.path);
    // TODO: update this to actually use the filters
    return all;
  }

  async patch(data: endpointPatch) {
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

  async post(data: endpointCreate) {
    return await $fetch(this.path, {
      method: "POST",
      body: {
        createdBy: data.profileUsername,
        updatedBy: data.profileUsername,
        path: data.data.path,
        method: data.data.method,
        hidden: data.data.hidden,
        locked: data.data.locked,
      },
    });
  }

  async postMany(data: endpointCreate[]) {
    let target = this.path;
    let res = 0;
    data.forEach(async function (item) {
      let a = await $fetch(target, {
        method: "POST",
        body: {
          createdBy: item.profileUsername,
          updatedBy: item.profileUsername,
          path: item.data.path,
          method: item.data.method,
          hidden: item.data.hidden,
          locked: item.data.locked,
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
