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

// TODO: Rewrite this
export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  // TODO: Currently doesn't return anything for a bad request
  if (data != null) {
    if ("path" in data && "profile" in data) {
      try {
        var uniq: Prisma.ProfileWhereUniqueInput = { username: data.profile };
        var user: Prisma.ProfileCreateNestedOneWithoutEndpointCreatedByProfileInput =
          { connect: uniq };
        var rq: Prisma.EndpointCreateInput;
        rq = {
          path: data.path,
          method: data.method == undefined ? "GET" : data.method,
          behaviors: data.behaviors == undefined ? null : data.behaviors, // TODO: figure out what needs to happen here because I don't know
          hidden: data.hidden == undefined ? false : true,
          locked: data.locked == undefined ? false : true,
          createdBy: user,
          udpdatedBy: user,
        };
        await prisma.endpoint.create({ data: rq });
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
