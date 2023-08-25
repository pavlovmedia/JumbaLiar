import db from "~/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    let res = await db("Model").insert(body);
    return res;
  } catch (error) {
    return -1;
  }
});
