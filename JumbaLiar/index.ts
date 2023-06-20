import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Provided example 1
  // const allUsers = await prisma.user.findMany()
  // console.log(allUsers)

  // testing new database
  await prisma.profile.create({
    data: {
      username: 'testing',
      password: 'password',
      email: 'test@gmail.com',
    },
  })

  // const allUsers = await prisma.user.findMany({
  //   include: {
  //     posts: true,
  //     profile: true,
  //   },
  // })
  // console.dir(allUsers, { depth: null })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })