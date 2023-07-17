import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler((event) => {
  if (event.node.req.method === 'GET') {
    // console.log(event.node.req);
    if (event.node.req.body != null){
      console.log(event.node.req.body);
      return prisma.profile.findMany({where: event.node.req.body});// CHECK THIS
    }
    return event.node.req.method;
  }
  console.log('Test get handler');
})

async function getAllProfiles() {
  return await prisma.profile.findMany();
}

async function getProfilesFilters(params) {
  return await prisma.profile.findMany(params);
}
