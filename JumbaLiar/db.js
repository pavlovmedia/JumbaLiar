import knex from 'knex';

export default knex({
  client: 'mysql',
  version: '5.7',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'example',
    database: 'jumbaliar'
  },
})