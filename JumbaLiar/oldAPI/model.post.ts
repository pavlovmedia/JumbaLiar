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
    if ("profileUsername" in data && "body" in data) {
      try {
        var uniq: Prisma.ProfileWhereUniqueInput = {
          username: data.profileUsername,
        };
        var user: Prisma.ProfileCreateNestedOneWithoutModelCreatedByProfileInput =
          { connect: uniq };
        var rq: Prisma.ModelCreateInput;
        rq = {
          label: data.body.label,
          type: data.body.type == undefined ? "#298BB5" : data.body.type,
          data: data.body.data == undefined ? "default" : data.body.data,
          createdBy: user,
          udpdatedBy: user,
        };
        await prisma.model.create({ data: rq });
        return 0;
      } catch (error) {
        // Errors are now caught here, nothing descriptive is done though
        return -2;
      }
    } else {
      // TODO: add more descriptive behavior?
      return -1;
    }
  }
  // TODO: add more descriptive behavior?
  return -1;
});
