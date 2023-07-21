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
    if ("id" in data && "label" in data && "type" in data && "data" in data) {
      try {
        // var uniq: Prisma.ProfileWhereUniqueInput = { username: data.profile };
        // var user: Prisma.ProfileCreateNestedOneWithoutModelCreatedByProfileInput =
        //   { connect: uniq };
        // var rq: Prisma.ModelCreateInput;
        // rq = {
        //   label: data.label,
        //   type: data.type == undefined ? "#298BB5" : data.type,
        //   data: data.data == undefined ? "default" : data.data,
        //   createdBy: user,
        //   udpdatedBy: user,
        // };
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
        // Errors are now caught here, nothing descriptive is done though
        return -2;
      }
    } else {
      return -1;
    }
  }
  return -1;
});
