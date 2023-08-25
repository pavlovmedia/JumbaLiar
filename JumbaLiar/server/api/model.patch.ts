import db from "~/db";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    let res = await db("Model").where(body.filters).update(body.update);
    return res;
  } catch (error) {
    return -1;
  }
});
