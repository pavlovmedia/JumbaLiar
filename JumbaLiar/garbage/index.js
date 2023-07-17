import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

export default {
  path: '/api',
  handler: app
}

app.get(`/model`, async (req, res) => {
  const result = await prisma.model.findMany({})
  res.json(result)
})


app.post(`/metric`, async (req, res) => {
  const result = await prisma.profile.findMany({})
  res.json(result);
})

app.get('/components/NewEndpoint', () => {
  console.log("Testing");
})

async function main() {
  
  await prisma.model.create({
    data: {
      username: 'BobbyTables',
      password: 'password',
      email: 'bobby@tables.io',
    },
  })

  const allUsers = await prisma.profile.findMany({})
  console.dir(allUsers, { depth: null })
}



// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })