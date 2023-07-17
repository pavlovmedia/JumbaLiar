import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const data = await prisma.profile.findMany({})
})

class Profile {
  constructor(){}

  async read(filters:Object) {
    return await prisma.profile.findMany({where: filters})
  }

  async create(filters:Object) {
    return await prisma.profile.create
  }

  async udpate(filters:Object) {
    return await prisma.profile.findMany({where: filters})
  }

  async destroy(filters:Object) {
    return await prisma.profile.findMany({where: filters})
  }
}

