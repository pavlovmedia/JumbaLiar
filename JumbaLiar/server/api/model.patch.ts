import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient({
  log: [
    { level: "warn", emit: "event" },
    { level: "info", emit: "event" },
    { level: "error", emit: "event" },
  ],
});

// debugging
prisma.$on("warn", (e) => {
  console.log(e);
});

prisma.$on("info", (e) => {
  console.log(e);
});

prisma.$on("error", (e) => {
  // TODO: Modify this to raise some sort of error so it can be relayed back to the frontend
  console.log(e);
});

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  // TODO: Currently doesn't return anything for a bad request
  if (data != null) {
    if ("id" in data && "label" in data && "type" in data && "data" in data) {
      try {
        await prisma.model.update({
          where: { id: data.id },
          data: {
            label: data.label,
            type: data.type,
            data: data.data,
          },
        });
        return 0;
      } catch (error) {
        return -1;
      }
    } else {
      return -1;
    }
  }
  return -1;
});
