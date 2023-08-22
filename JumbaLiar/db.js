import knex from 'knex';

export default knex({
  client: 'mysql',
  version: '5.7',
  connection: {
    host: 'localhost:3306',
    port: 3306,
    user: 'root',
    password: 'example',
    database: 'jumbaliar'
  },
})