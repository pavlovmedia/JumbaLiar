import db from "~/db";
import jwt from "jsonwebtoken";

// requires filters
export const get = async request => {
  if (!request.headers.authorization) { return { status: 403 } }
  let endpoints = await db('Endpoint')
    .where(request.body.filters)
    .del();
  
  return {
    body: endpoints
  }
}

// requires user, path, method, hidden, and locked
export const post = async request => {
  if (!request.headers.authorization) { return { status: 403 } }

  // Don't want to deal with this now
  // const token = jwt.verify(request.headers.authorization, import.meta.env.VITE_PWD_SALT);
  // if (!token) { return { status: 403 } }

  let endpoint = await db('Endpoint').insert({ 
    createdBy: request.body.user, 
    updatedBy: request.body.user, 
    path: request.body.path, 
    method: request.body.method,
    hidden: request.body.hidden, 
    locked: request.body.locked, 
  });
  return {
    body: endpoint
  }
}

// requires filter, user, path, method, hidden, and locked
export const patch = async request => {
  if (!request.headers.authorization) { return { status: 403 } }
  let res = await db('Endpoint')
    .where(filter)
    .update({
      updatedBy: request.body.user,
      path: request.body.path, 
      method: request.body.method,
      hidden: request.body.hidden, 
      locked: request.body.locked, 
    });

  return {
    body: res
  }
}

// requires filters
export const del = async request => {
  if (!request.headers.authorization) { return { status: 403 } }
  let res = await db('Endpoint')
    .where(request.body.filters)
    .del();
  
  return {
    body: res
  }
}