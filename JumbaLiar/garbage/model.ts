import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  // event.node.req.body has the following fields: method, filter, data
  // method is the DB method and filter contains the prisma filters   
  // methods: GET, PUT, PATCH, DELETE
  // data: used for creation of new table item
  return event;
  if (event.node.req.body != null){
    var res = null;
    switch (event.node.req.body.method) {
      case "GET": {
        let filters = event.node.req.body.filter;
        if (filters == null) {
          let data = await prisma.model.findMany({});
          console.log(data);
          console.log("server above");
          return data;
        } else {
          return await prisma.model.findMany({where: event.node.req.body.filter});
        }
      }
      case "PUT": {
        prisma.model.create({data: event.node.req.body.data});
      }
      case "PATCH": {
        prisma.model.update({where:event.node.req.body.filter, data:event.node.req.body.data});
      }
      case "DELETE": {
        prisma.model.delete({where: event.node.req.body.filter})
      }
      default: {
        // TODO: Maybe this should throw some sort of error to indicate that it was an invalid request?
        return null;
      }
    }
  } 
  // TODO: Maybe this should throw some sort of error to indicate that it was an invalid request?
  return null;
})
