import db from "~/db";
import jwt from "jsonwebtoken";

export const post = async request => {
  if (!request.headers.authorization) { return { status: 403 } }
  const token = jwt.verify(request.headers.authorization, import.meta.env.VITE_PWD_SALT);
  if (!token) { return { status: 403 } }
  // Perform the action
  let user = await db('users').where('email', request.body.email);
  if (user.length === 0) { return { error: '404' } }
  let guest = await db('guests').insert({ userId: user[0].id, listId: request.body.listId });
  // Return
  return {
    body: guest
  }
}