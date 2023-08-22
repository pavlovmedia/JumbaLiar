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
  console.log(e);
});

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  // TODO: Currently doesn't return anything for a bad request
  if (data != null) {
    if ("id" in data) {
      try {
        await prisma.endpoint.delete({
          where: {
            id: data.id,
          },
        });
        return 0;
      } catch (error) {
        // Same as above comment
        return -1;
      }
    } else {
      return -1;
    }
  }
  return -1;
});
