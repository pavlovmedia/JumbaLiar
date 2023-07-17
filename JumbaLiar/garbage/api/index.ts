import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

export default {
  path: '/api',
  handler: app
}

async function main() {
  
  await prisma.profile.create({
    data: {
      username: 'wheeeeeeee',
      password: 'password',
      email: 'bobby@tables.io',
    },
  })

  const allUsers = await prisma.profile.findMany({})
  console.dir(allUsers, { depth: null })
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