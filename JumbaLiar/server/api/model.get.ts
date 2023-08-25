import db from "~/db";

export default defineEventHandler(async (event) => {
  try {
    let models = await db("Model");
    return models;
  } catch (error) {
    return [];
  }
});
