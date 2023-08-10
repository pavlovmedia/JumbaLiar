import knex from 'knex'

export default knex({
  client: 'mysql',
  version: '5.7',
  connection: {
    host: import.meta.env.VITE_DB_HOST,
    port: 3306,
    user: import.meta.env.VITE_DB_USER,
    password: import.meta.env.VITE_DB_PASSWORD,
    database: 'jumbaliar'
  },
})