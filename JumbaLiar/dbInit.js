import db from "db";

export default async function () {
  await db.schema.createTableIfNotExists('DataFilter', table => {
    table.enu('type', ['INDEX', 'FIELD']);
    table.string('field');
    table.setNullable('field');
    table.string('value'); // TODO: should be string|filter?
    table.unique(['type', 'value']);
  });

  await db.schema.createTableIfNotExists('RequestFilter', table => {
    table.enu('type', ['HEADER', 'BODY', 'PATH', 'USER', 'DATE', 'STRING', 'QUERY', 'USAGE']);
    table.string('field');
    table.setNullable('field');
    table.string('value'); // TODO: should be string|filter?
    table.unique(['type', 'value']);
  });

  await db.schema.createTableIfNotExists('ProxyConfig', table => {
    table.uuid('proxyId').defaultTo(knex.fn.uuid());
    table.string('path');
    table.setNullable('path');
  });

  await db.schema.createTableIfNotExists('ModelDataConfig', table => {
    table.uuid('modelId').defaultTo(knex.fn.uuid());
  });
  
  await db.schema.createTableIfNotExists('StatusConfig', table => {
    table.integer('status');  // TODO: Does this need to be unique
  });

  await db.schema.createTableIfNotExists('Content', table => {
    table.uuid('proxyId').defaultTo(knex.fn.uuid());  // this was added to 
    table.enu('source', ['PROXY', 'MODEL_DATA', 'PAYLOAD', 'INJECT', 'STATUS_CODE']);
    // TODO: link to filter[]
    // TODO: link to proper config
    //   Maybe needs two config fields that are both nullable?
  });

  await db.schema.createTableIfNotExists('Behavior', table => {
    // TODO: link to filter[]
    table.enu('action', ['RESPOND', 'INSERT_DB', 'MUTATE_DB']);
    // TODO: link to content[]
    // TODO: link to filter[]
  });

  await db.schema.createTableIfNotExists('Profile', table => {
    table.string('username');
    table.string('password');
    table.string('email');
  });

  await db.schema.createTableIfNotExists('Endpoint', table => {
    table.uuid('id').defaultTo(knex.fn.uuid());
    table.string('createdBy').notNullable().references('username').inTable('Profile');
    table.string('updatedBy').notNullable().references('username').inTable('Profile');
    // NOTE: Column names are createdAt and updatedAt
    table.timestamps(true, true, true); 
    table.string('path');
    table.enu('method', ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS', 'DELETE'])
    // TODO: link to behavior[]
    table.boolean('hidden');
    table.boolean('locked');
  });

  await db.schema.createTableIfNotExists('Model', table => {
    table.uuid('id').defaultTo(knex.fn.uuid());
    table.string('createdBy').notNullable().references('username').inTable('Profile');
    table.string('updatedBy').notNullable().references('username').inTable('Profile');
    // NOTE: Column names are createdAt and updatedAt
    table.timestamps(true, true, true); //table.timestamps([useTimestamps], [defaultToNow], [useCamelCase])
    table.string('label');
    table.string('type');
    table.string('data');
    table.unique('label');
  }); 

  await db.schema.createTableIfNotExists('Proxy', table => {
    table.string('baseUrl');
    table.string('color');
    table.string('label');
  });
};