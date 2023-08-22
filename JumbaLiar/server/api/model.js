import db from "~/db";
import jwt from "jsonwebtoken";

// requires filters
export const get = async request => {
  if (!request.headers.authorization) { return { status: 403 } }
  let models = await db('Model')
    .where(request.body.filters)
    .del();
  
  return {
    body: models
  }
}

// requires user, label, type, data
export const post = async request => {
  if (!request.headers.authorization) { return { status: 403 } };

  let model = await db('Model').insert({ 
    createdBy: request.body.user, 
    updatedBy: request.body.user, 
    label: request.body.label, 
    type: request.body.type,
    data: request.body.data, 
  });
  return {
    body: model
  }
}

// requires filter, user, label, type, data
export const patch = async request => {
  if (!request.headers.authorization) { return { status: 403 } }
  let res = await db('Model')
    .where(filter)
    .update({
      updatedBy: request.body.user, 
      label: request.body.label, 
      type: request.body.type,
      data: request.body.data, 
    });

  return {
    body: res
  }
}

// requires filters
export const del = async request => {
  if (!request.headers.authorization) { return { status: 403 } }
  let res = await db('Model')
    .where(request.body.filters)
    .del();
  
  return {
    body: res
  }
}