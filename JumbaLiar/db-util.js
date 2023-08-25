import db from "~/db";

export async function init() {
  if (!(await db.schema.hasTable('DataFilter'))) {
    console.log('DataFilter doesnt exist');
    await db.schema.createTable('DataFilter', table => {
      table.enu('type', ['INDEX', 'FIELD']);
      table.string('field');
      table.setNullable('field');
      table.string('value'); // TODO: should be string|filter?
      table.unique(['type', 'value']);
    });
  }

  if (!(await db.schema.hasTable('RequestFilter'))) {
    await db.schema.createTable('RequestFilter', table => {
    table.enu('type', ['HEADER', 'BODY', 'PATH', 'USER', 'DATE', 'STRING', 'QUERY', 'USAGE']);
    table.string('field');
    table.setNullable('field');
    table.string('value'); // TODO: should be string|filter?
    table.unique(['type', 'value']);
    });
  }

  if (!(await db.schema.hasTable('ProxyConfig'))) {
    await db.schema.createTable('ProxyConfig', table => {
    table.uuid('proxyId').defaultTo(knex.fn.uuid());
    table.string('path');
    table.setNullable('path');
    });
  }

  if (!(await db.schema.hasTable('ModelDataConfig'))) {
    await db.schema.createTable('ModelDataConfig', table => {
    table.uuid('modelId').defaultTo(knex.fn.uuid());
    });
  }
  
  if (!(await db.schema.hasTable('StatusConfig'))) {
    await db.schema.createTable('StatusConfig', table => {
    table.integer('status');  // TODO: Does this need to be unique
    });
  }

  if (!(await db.schema.hasTable('Content'))) {
    await db.schema.createTable('Content', table => {
    table.uuid('proxyId').defaultTo(knex.fn.uuid());  // this was added to 
    table.enu('source', ['PROXY', 'MODEL_DATA', 'PAYLOAD', 'INJECT', 'STATUS_CODE']);
    // TODO: link to filter[]
    // TODO: link to proper config
    //   Maybe needs two config fields that are both nullable?
    });
  }

  if (!(await db.schema.hasTable('Behavior'))) {
    await db.schema.createTable('Behavior', table => {
    // TODO: link to filter[]
    table.enu('action', ['RESPOND', 'INSERT_DB', 'MUTATE_DB']);
    // TODO: link to content[]
    // TODO: link to filter[]
    });
  }

  if (!(await db.schema.hasTable('Profile'))) {
    await db.schema.createTable('Profile', table => {
    table.string('username');
    table.string('password');
    table.string('email');
    });
  }

  if (!(await db.schema.hasTable('Endpoint'))) {
    await db.schema.createTable('Endpoint', table => {
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
  }

  if (!(await db.schema.hasTable('Model'))) {
    await db.schema.createTable('Model', table => {
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
  }

  if (!(await db.schema.hasTable('Proxy'))) {
    await db.schema.createTable('Proxy', table => {
    table.string('baseUrl');
    table.string('color');
    table.string('label');
    });
  }
}

export async function drop(table) {
  await db.schema.dropTableIfExists(table);
};