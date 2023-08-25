import db from "~/db";
import knex from "knex";

export default defineEventHandler(async (event) => {
  try {
    let status = await db.schema.hasTable("DataFilter");
    if (!status) {
      await db.schema.createTable("DataFilter", function (table) {
        table.enu("type", ["INDEX", "FIELD"]).notNullable();
        table.string("field");
        table.string("value").notNullable(); // TODO: should be string|filter?
        table.unique(["type", "value"]);
      });
    }

    status = await db.schema.hasTable("RequestFilter");
    if (!status) {
      await db.schema.createTable("RequestFilter", (table) => {
        table
          .enu("type", [
            "HEADER",
            "BODY",
            "PATH",
            "USER",
            "DATE",
            "STRING",
            "QUERY",
            "USAGE",
          ])
          .notNullable();
        table.string("field");
        table.string("value").notNullable(); // TODO: should be string|filter?
        table.unique(["type", "value"]);
      });
    }

    status = await db.schema.hasTable("ProxyConfig");
    if (!status) {
      await db.schema.createTable("ProxyConfig", (table) => {
        table.uuid("proxyId").defaultTo(db.fn.uuid()).notNullable();
        table.string("path");
      });
    }

    status = await db.schema.hasTable("ModelDataConfig");
    if (!status) {
      await db.schema.createTable("ModelDataConfig", (table) => {
        table.uuid("modelId").defaultTo(db.fn.uuid()).notNullable();
      });
    }

    status = await db.schema.hasTable("StatusConfig");
    if (!status) {
      await db.schema.createTable("StatusConfig", (table) => {
        table.integer("status").notNullable(); // TODO: Does this need to be unique
      });
    }

    status = await db.schema.hasTable("Content");
    if (!status) {
      await db.schema.createTable("Content", (table) => {
        table.uuid("proxyId").defaultTo(db.fn.uuid()).notNullable(); // this was added
        table
          .enu("source", [
            "PROXY",
            "MODEL_DATA",
            "PAYLOAD",
            "INJECT",
            "STATUS_CODE",
          ])
          .notNullable();
        // TODO: link to filter[]
        // TODO: link to proper config
        //   Maybe needs two config fields that are both nullable?
      });
    }

    status = await db.schema.hasTable("Behavior");
    if (!status) {
      await db.schema.createTable("Behavior", (table) => {
        // TODO: link to filter[]
        table
          .enu("action", ["RESPOND", "INSERT_DB", "MUTATE_DB"])
          .notNullable();
        // TODO: link to content[]
        // TODO: link to filter[]
      });
    }

    status = await db.schema.hasTable("Profile");
    if (!status) {
      await db.schema.createTable("Profile", (table) => {
        table.string("username").notNullable();
        table.string("password").notNullable();
        table.string("email").notNullable();
      });
    }

    status = await db.schema.hasTable("Endpoint");
    if (!status) {
      await db.schema.createTable("Endpoint", (table) => {
        table.uuid("id").defaultTo(db.fn.uuid()).notNullable();
        table.string("createdBy").references("username").inTable("Profile");
        table.string("updatedBy").references("username").inTable("Profile");
        // NOTE: Column names are createdAt and updatedAt
        table.timestamps(true, true, true);
        table.string("path").notNullable();
        table
          .enu("method", ["GET", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"])
          .notNullable();
        // TODO: link to behavior[]
        table.boolean("hidden").notNullable();
        table.boolean("locked").notNullable();
      });
    }

    status = await db.schema.hasTable("Model");
    if (!status) {
      await db.schema.createTable("Model", (table) => {
        table.uuid("id").defaultTo(db.fn.uuid()).notNullable();
        table
          .string("createdBy")
          .notNullable()
          .references("username")
          .inTable("Profile");
        table
          .string("updatedBy")
          .notNullable()
          .references("username")
          .inTable("Profile");
        // NOTE: Column names are createdAt and updatedAt
        table.timestamps(true, true, true); //table.timestamps([useTimestamps], [defaultToNow], [useCamelCase])
        table.string("label").notNullable();
        table.string("type").notNullable();
        table.string("data").notNullable();
        table.unique("label");
      });
    }

    status = await db.schema.hasTable("Proxy");
    if (!status) {
      await db.schema.createTable("Proxy", (table) => {
        table.string("baseUrl").notNullable();
        table.string("color").notNullable();
        table.string("label").notNullable();
      });
    }
  } catch (error) {
    return error;
  }
});
