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
  // Doesn't check if request is valid, will maybe throw error or more likely return nothing
  try {
    await prisma.model.findMany({ where: data });
    return 0;
  } catch (error) {
    // Errors are now caught here, nothing descriptive is done though
    return -2;
  }
  // } else {
  //   // TODO: add more descriptive behavior
  //   return -1;
  // }
});
