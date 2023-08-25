import db from "~/db";

export default defineEventHandler(async (event) => {
  try {
    let Endpoints = await db("Endpoint");
    return Endpoints;
  } catch (error) {
    return [];
  }
});
