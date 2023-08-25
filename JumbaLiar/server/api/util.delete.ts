import db from "~/db";

export default defineEventHandler(async (event) => {
  const tables = [
    "Behavior",
    "Content",
    "DataFilter",
    "Endpoint",
    "Filter",
    "Model",
    "ModelDataConfig",
    "Profile",
    "Proxy",
    "ProxyConfig",
    "RequestFilter",
    "StatusConfig",
  ];
  tables.forEach(async function (table) {
    try {
      if (await db.schema.hasTable(table)) await db.schema.dropTable(table);
    } catch (error) {}
  });
});
