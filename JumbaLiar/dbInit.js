import db from "db";

export default async function () {
  /**
   * Action
   * Method
   * Source
   * 
   * Order of tables with enums
   * 
   * Filter
   *   Type >> DataLookupType, RequestLookupType
   * ProxyConfig
   * ModelDataConfig
   * StatusConfig
   * Content
   *   source >> Source
   * Behavior
   * Profile
   * Endpoint
   * Model
   * Profile
   * Proxy
   */

  await db.schema.createTableIfNotExists('Filter', table => {
    // type field goes here, won't be fun. Maybe just make a second 
    table.string('field');
  })

  await db.schema.createTableIfNotExists('ProxyConfig', table => {
    // table.string('proxyId');
    table.string('path');
    table.setNullable('path');
  });

  await db.schema.createTableIfNotExists('ModelDataConfig', table => {
    // table.string('modelId');
  })
  
  await db.schema.createTableIfNotExists('StatusConfig', table => {
    table.integer('status');
  })

  await db.schema.createTableIfNotExists('Content', table => {

  })

  await db.schema.createTableIfNotExists('Behavior', table => {

  })

  await db.schema.createTableIfNotExists('Profile', table => {

  })

  await db.schema.createTableIfNotExists('Endpoint', table => {

  })

  await db.schema.createTableIfNotExists('Model', table => {

  })  

  await db.schema.createTableIfNotExists('Profile', table => {

  })  

  await db.schema.createTableIfNotExists('Proxy', table => {

  })  
};