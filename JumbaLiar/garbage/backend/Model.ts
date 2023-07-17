export class Model {
  constructor(){}

  async getAllModelsFormatted() {
    return await $fetch( '/api/model', {
      method: 'DELETE',
    });
    const data = await useFetch("/server/api/helpers/model");//, {body: {}});
    console.log("aaa");
    console.log(data);
    console.log("here");
  }

  async getFilteredModelsFormatted(filters: Object) {
    const data = await useFetch("/api/helpers/model", {
      body: {
        filter: filters,
      },
    });
    console.log(data);
  }

  async addModel(data: Object) {
    await useFetch("/api/helpers/model", )
  }

}